const {StringDecoder} = require('string_decoder');
const deepAssign = require('deep-assign');
const sax = require('sax');
const through = require('through2');

const defaultOpts = {
	strict: true,
	stripAttributes: false,
	stripCdata: true,
	stripComments: true,
	stripDoctype: true,
	stripInstruction: true,
	pretty: true,
	tagFilter: null,
	newlines: true,
	indentStyle: 'spaces',
	indentSpaces: 2,
	indentTabs: 1,
	saxOptions: {
		trim: true,
		normalize: false,
		lowercase: false,
		xmlns: false,
		position: false,
		strictEntities: false
	}
};

const self = {};
self.opts = {};
self.tagFilter = null;
self.mustPrint = false;
self.level = 0;
self.nestLevel = 0;
self.isSelfClosing = false;

let lastChunk = '';
const decoder = new StringDecoder('utf8');
let parser;

const transformStream = function (chunk, enc, cb) {
	parser = sax.createStream(self.opts.strict, self.opts.saxOptions);
	lastChunk += decoder.write(chunk);
	const me = this;

	function entityQuotes(str) {
		return str.replace('"', '&quot;');
	}

	function print(xml) {
		if (self.mustPrint === true) {
			me.push(eol(indent(xml)));
		}
	}

	function indent(xml) {
		if (self.opts.pretty === true) {
			for (let j = self.level; j > 0; j--) {
				if (self.opts.indentStyle === 'spaces') {
					for (let i = 0; i < self.opts.indentSpaces; i++) {
						xml = ' ' + xml;
					}
				} else if (self.opts.indentStyle === 'tabs') {
					for (let i = 0; i < self.opts.indentTabs; i++) {
						xml = '\t' + xml;
					}
				}
			}
		}

		return xml;
	}

	function eol(xml) {
		if (self.opts.pretty === true) {
			xml += '\n';
		}

		return xml;
	}

	parser.onopentag = function (tag) {
		if (tag.isSelfClosing) {
			self.isSelfClosing = true;
		}

		if (tag.name === self.tagFilter) {
			self.mustPrint = true;
			self.nestLevel += 1;
		}

		let printable = '<' + tag.name;
		if (self.opts.stripAttributes === false) {
			if (tag.attributes) {
				for (const i in tag.attributes) {
					if (tag.attributes[i]) {
						printable += ' ' + i + '="';
						printable += entityQuotes(tag.attributes[i]) + '"';
					}
				}
			}
		}

		printable += (self.isSelfClosing) ? '/>' : '>';
		print(printable);
		self.level += self.mustPrint ? 1 : 0;
		me.emit('opentag', tag);
	};

	parser.onclosetag = function (tag) {
		self.level -= self.mustPrint ? 1 : 0;
		if (!self.isSelfClosing) {
			print('</' + tag + '>');
		}

		if (tag === self.tagFilter) {
			self.nestLevel -= 1;
			if (self.nestLevel === 0) {
				self.mustPrint = false;
			}
		}

		self.isSelfClosing = false;
		me.emit('closetag', tag);
	};

	parser.onattribute = function (attr) {
		me.emit('attribute', attr);
	};

	parser.ontext = function (text) {
		print(text);
		me.emit('text', text);
	};

	parser.onopencdata = function () {
		if (self.opts.stripCdata === false) {
			print('<![CDATA[');
			me.emit('opencdata');
		}
	};

	parser.oncdata = function (text) {
		if (self.opts.stripCdata === false) {
			self.level += 1;
			print(text);
			self.level -= 1;
			me.emit('cdata', text);
		}
	};

	parser.onclosecdata = function () {
		if (self.opts.stripCdata === false) {
			print(']]>');
			me.emit('closecdata');
		}
	};

	parser.oncomment = function (comment) {
		if (self.opts.stripComments === false) {
			print('<!-- ' + comment + ' -->');
			me.emit('comment', comment);
		}
	};

	parser.ondoctype = function (doctype) {
		if (self.opts.stripDoctype === false) {
			print('<!DOCTYPE' + doctype + '>');
			me.emit('doctype', doctype);
		}
	};

	parser.onprocessinginstruction = function (instruction) {
		if (self.opts.stripInstruction === false) {
			print('<?' + instruction.name + ' ' + instruction.body + '?>');
			me.emit('instruction', instruction);
		}
	};

	parser.write(lastChunk);
	lastChunk = '';
	cb();
};

const endStream = function (cb) {
	lastChunk += decoder.end();
	if (lastChunk.length > 0) {
		parser.write(lastChunk);
	}

	cb();
};

module.exports = function (opts) {
	self.mustPrint = false;
	self.tagFilter = (opts && opts.tagFilter) ? opts.tagFilter : null;
	if (self.tagFilter === null) {
		self.mustPrint = true;
	}

	self.level = 0;
	self.nestLevel = 0;
	deepAssign(self.opts, defaultOpts, opts ? opts : {});

	return through(transformStream, endStream);
};
