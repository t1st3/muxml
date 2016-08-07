
import {StringDecoder} from 'string_decoder';
import deepAssign from 'deep-assign';
import sax from 'sax';
import through from 'through2';

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

let self = {};
self.opts = {};
self.tagFilter = null;
self.mustPrint = false;
self.level = 0;
self.nestLevel = 0;

let lastChunk = '';
let decoder = new StringDecoder('utf8');
let parser;

let transformStream = function (chunk, enc, cb) {
	parser = sax.createStream(self.opts.strict, self.opts.saxOptions);
	lastChunk += decoder.write(chunk);
	let me = this;

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
		if (tag.name === self.tagFilter) {
			self.mustPrint = true;
			self.nestLevel += 1;
		}
		let printable = '<' + tag.name;
		if (self.opts.stripAttributes === false) {
			if (tag.attributes) {
				for (let i in tag.attributes) {
					if (tag.attributes[i]) {
						printable += ' ' + i + '="';
						printable += entityQuotes(tag.attributes[i]) + '"';
					}
				}
			}
		}
		printable += '>';
		print(printable);
		self.level += self.mustPrint ? 1 : 0;
		me.emit('openTag', tag);
	};

	parser.onclosetag = function (tag) {
		self.level -= self.mustPrint ? 1 : 0;
		print('</' + tag + '>');
		if (tag === self.tagFilter) {
			self.nestLevel -= 1;
			if (self.nestLevel === 0) {
				self.mustPrint = false;
			}
		}
		me.emit('closeTag', tag);
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
			me.emit('openCdata');
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
			me.emit('closeCdata');
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

let endStream = function (cb) {
	lastChunk += decoder.end();
	if (lastChunk.length > 0) {
		parser.write(lastChunk);
	}
	cb();
};

export default function (opts) {
	self.mustPrint = false;
	self.tagFilter = (opts && opts.tagFilter) ? opts.tagFilter : null;
	if (self.tagFilter === null) {
		self.mustPrint = true;
	}
	self.level = 0;
	self.nestLevel = 0;
	deepAssign(self.opts, defaultOpts, opts ? opts : {});

	return through(transformStream, endStream);
}
