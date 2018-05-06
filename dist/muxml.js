(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('string_decoder'), require('deep-assign'), require('sax'), require('through2')) :
	typeof define === 'function' && define.amd ? define(['exports', 'string_decoder', 'deep-assign', 'sax', 'through2'], factory) :
	(factory((global.muxml = {}),global.string_decoder,global.deepAssign,global.sax,global.through));
}(this, (function (exports,string_decoder,deepAssign,sax,through) { 'use strict';

	deepAssign = deepAssign && deepAssign.hasOwnProperty('default') ? deepAssign['default'] : deepAssign;
	sax = sax && sax.hasOwnProperty('default') ? sax['default'] : sax;
	through = through && through.hasOwnProperty('default') ? through['default'] : through;

	var defaultOpts = {
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

	var self = {};
	self.opts = {};
	self.tagFilter = null;
	self.mustPrint = false;
	self.level = 0;
	self.nestLevel = 0;
	self.isSelfClosing = false;

	var lastChunk = '';
	var decoder = new string_decoder.StringDecoder('utf8');
	var parser = void 0;

	var transformStream = function transformStream(chunk, enc, cb) {
		parser = sax.createStream(self.opts.strict, self.opts.saxOptions);
		lastChunk += decoder.write(chunk);
		var me = this;

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
				for (var j = self.level; j > 0; j--) {
					if (self.opts.indentStyle === 'spaces') {
						for (var i = 0; i < self.opts.indentSpaces; i++) {
							xml = ' ' + xml;
						}
					} else if (self.opts.indentStyle === 'tabs') {
						for (var _i = 0; _i < self.opts.indentTabs; _i++) {
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
			var printable = '<' + tag.name;
			if (self.opts.stripAttributes === false) {
				if (tag.attributes) {
					for (var i in tag.attributes) {
						if (tag.attributes[i]) {
							printable += ' ' + i + '="';
							printable += entityQuotes(tag.attributes[i]) + '"';
						}
					}
				}
			}
			printable += self.isSelfClosing ? '/>' : '>';
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

	var endStream = function endStream(cb) {
		lastChunk += decoder.end();
		if (lastChunk.length > 0) {
			parser.write(lastChunk);
		}
		cb();
	};

	function index (opts) {
		self.mustPrint = false;
		self.tagFilter = opts && opts.tagFilter ? opts.tagFilter : null;
		if (self.tagFilter === null) {
			self.mustPrint = true;
		}
		self.level = 0;
		self.nestLevel = 0;
		deepAssign(self.opts, defaultOpts, opts ? opts : {});

		return through(transformStream, endStream);
	}

	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=muxml.js.map
