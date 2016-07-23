(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('string_decoder'), require('deep-assign'), require('sax'), require('through2')) :
	typeof define === 'function' && define.amd ? define('muxml', ['exports', 'string_decoder', 'deep-assign', 'sax', 'through2'], factory) :
	(factory((global.muxml = global.muxml || {}),global.string_decoder,global.deepAssign,global.sax,global.through));
}(this, function (exports,string_decoder,deepAssign,sax,through) { 'use strict';

	deepAssign = 'default' in deepAssign ? deepAssign['default'] : deepAssign;
	sax = 'default' in sax ? sax['default'] : sax;
	through = 'default' in through ? through['default'] : through;

	var _coverage__file;

	function _cover__() {
		if (!_coverage__file) _coverage__file = _coverage__getInitialState();
		return _coverage__file;
	}

	function _coverage__getInitialState() {
		var path = '/home/t1st3/dev/muxml/src/index.js',
		    hash = '46e2fdc75462a4cbfb9226f494a279d1';
		var global = new Function('return this')();
		var coverage = global['__coverage__'] || (global['__coverage__'] = {});
		if (coverage[path] && coverage[path].hash === hash) return coverage[path];
		var coverageData = global['JSON'].parse('{"path":"/home/t1st3/dev/muxml/src/index.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"39":0,"40":0,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"106":0,"107":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0],"9":[0,0],"10":[0,0],"11":[0,0],"12":[0,0],"13":[0,0],"14":[0,0],"15":[0,0],"16":[0,0],"17":[0,0],"18":[0,0],"19":[0,0],"20":[0,0],"21":[0,0],"22":[0,0],"23":[0,0],"24":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},"statementMap":{"1":{"start":{"line":7,"column":20},"end":{"line":28,"column":1}},"2":{"start":{"line":30,"column":11},"end":{"line":30,"column":13}},"3":{"start":{"line":31,"column":0},"end":{"line":31,"column":15}},"4":{"start":{"line":32,"column":0},"end":{"line":32,"column":21}},"5":{"start":{"line":33,"column":0},"end":{"line":33,"column":21}},"6":{"start":{"line":34,"column":0},"end":{"line":34,"column":22}},"7":{"start":{"line":35,"column":0},"end":{"line":35,"column":23}},"8":{"start":{"line":36,"column":0},"end":{"line":36,"column":15}},"9":{"start":{"line":37,"column":0},"end":{"line":37,"column":19}},"10":{"start":{"line":39,"column":16},"end":{"line":39,"column":18}},"11":{"start":{"line":40,"column":14},"end":{"line":40,"column":39}},"12":{"start":{"line":43,"column":22},"end":{"line":172,"column":1}},"13":{"start":{"line":44,"column":1},"end":{"line":44,"column":67}},"14":{"start":{"line":45,"column":1},"end":{"line":45,"column":35}},"15":{"start":{"line":46,"column":10},"end":{"line":46,"column":14}},"16":{"start":{"line":49,"column":2},"end":{"line":49,"column":36}},"17":{"start":{"line":53,"column":2},"end":{"line":55,"column":3}},"18":{"start":{"line":54,"column":3},"end":{"line":54,"column":29}},"19":{"start":{"line":59,"column":2},"end":{"line":71,"column":3}},"20":{"start":{"line":60,"column":3},"end":{"line":70,"column":4}},"21":{"start":{"line":60,"column":35},"end":{"line":60,"column":38}},"22":{"start":{"line":60,"column":16},"end":{"line":60,"column":26}},"23":{"start":{"line":61,"column":4},"end":{"line":69,"column":5}},"24":{"start":{"line":62,"column":5},"end":{"line":64,"column":6}},"25":{"start":{"line":62,"column":49},"end":{"line":62,"column":52}},"26":{"start":{"line":62,"column":18},"end":{"line":62,"column":19}},"27":{"start":{"line":63,"column":6},"end":{"line":63,"column":22}},"28":{"start":{"line":65,"column":11},"end":{"line":69,"column":5}},"29":{"start":{"line":66,"column":5},"end":{"line":68,"column":6}},"30":{"start":{"line":66,"column":47},"end":{"line":66,"column":50}},"31":{"start":{"line":66,"column":18},"end":{"line":66,"column":19}},"32":{"start":{"line":67,"column":6},"end":{"line":67,"column":23}},"33":{"start":{"line":72,"column":2},"end":{"line":72,"column":13}},"34":{"start":{"line":76,"column":2},"end":{"line":78,"column":3}},"35":{"start":{"line":77,"column":3},"end":{"line":77,"column":15}},"36":{"start":{"line":79,"column":2},"end":{"line":79,"column":13}},"37":{"start":{"line":82,"column":1},"end":{"line":102,"column":3}},"38":{"start":{"line":83,"column":2},"end":{"line":86,"column":3}},"39":{"start":{"line":84,"column":3},"end":{"line":84,"column":25}},"40":{"start":{"line":85,"column":3},"end":{"line":85,"column":23}},"41":{"start":{"line":87,"column":18},"end":{"line":87,"column":32}},"42":{"start":{"line":88,"column":2},"end":{"line":97,"column":3}},"43":{"start":{"line":89,"column":3},"end":{"line":96,"column":4}},"44":{"start":{"line":90,"column":4},"end":{"line":95,"column":5}},"45":{"start":{"line":91,"column":5},"end":{"line":94,"column":6}},"46":{"start":{"line":92,"column":6},"end":{"line":92,"column":34}},"47":{"start":{"line":93,"column":6},"end":{"line":93,"column":57}},"48":{"start":{"line":98,"column":2},"end":{"line":98,"column":19}},"49":{"start":{"line":99,"column":2},"end":{"line":99,"column":19}},"50":{"start":{"line":100,"column":2},"end":{"line":100,"column":39}},"51":{"start":{"line":100,"column":33},"end":{"line":100,"column":34}},"52":{"start":{"line":100,"column":37},"end":{"line":100,"column":38}},"53":{"start":{"line":101,"column":2},"end":{"line":101,"column":26}},"54":{"start":{"line":104,"column":1},"end":{"line":114,"column":3}},"55":{"start":{"line":105,"column":2},"end":{"line":105,"column":39}},"56":{"start":{"line":105,"column":33},"end":{"line":105,"column":34}},"57":{"start":{"line":105,"column":37},"end":{"line":105,"column":38}},"58":{"start":{"line":106,"column":2},"end":{"line":106,"column":26}},"59":{"start":{"line":107,"column":2},"end":{"line":112,"column":3}},"60":{"start":{"line":108,"column":3},"end":{"line":108,"column":23}},"61":{"start":{"line":109,"column":3},"end":{"line":111,"column":4}},"62":{"start":{"line":110,"column":4},"end":{"line":110,"column":27}},"63":{"start":{"line":113,"column":2},"end":{"line":113,"column":27}},"64":{"start":{"line":116,"column":1},"end":{"line":118,"column":3}},"65":{"start":{"line":117,"column":2},"end":{"line":117,"column":29}},"66":{"start":{"line":120,"column":1},"end":{"line":123,"column":3}},"67":{"start":{"line":121,"column":2},"end":{"line":121,"column":14}},"68":{"start":{"line":122,"column":2},"end":{"line":122,"column":24}},"69":{"start":{"line":125,"column":1},"end":{"line":130,"column":3}},"70":{"start":{"line":126,"column":2},"end":{"line":129,"column":3}},"71":{"start":{"line":127,"column":3},"end":{"line":127,"column":22}},"72":{"start":{"line":128,"column":3},"end":{"line":128,"column":24}},"73":{"start":{"line":132,"column":1},"end":{"line":139,"column":3}},"74":{"start":{"line":133,"column":2},"end":{"line":138,"column":3}},"75":{"start":{"line":134,"column":3},"end":{"line":134,"column":19}},"76":{"start":{"line":135,"column":3},"end":{"line":135,"column":15}},"77":{"start":{"line":136,"column":3},"end":{"line":136,"column":19}},"78":{"start":{"line":137,"column":3},"end":{"line":137,"column":26}},"79":{"start":{"line":141,"column":1},"end":{"line":146,"column":3}},"80":{"start":{"line":142,"column":2},"end":{"line":145,"column":3}},"81":{"start":{"line":143,"column":3},"end":{"line":143,"column":16}},"82":{"start":{"line":144,"column":3},"end":{"line":144,"column":25}},"83":{"start":{"line":148,"column":1},"end":{"line":153,"column":3}},"84":{"start":{"line":149,"column":2},"end":{"line":152,"column":3}},"85":{"start":{"line":150,"column":3},"end":{"line":150,"column":37}},"86":{"start":{"line":151,"column":3},"end":{"line":151,"column":31}},"87":{"start":{"line":155,"column":1},"end":{"line":160,"column":3}},"88":{"start":{"line":156,"column":2},"end":{"line":159,"column":3}},"89":{"start":{"line":157,"column":3},"end":{"line":157,"column":38}},"90":{"start":{"line":158,"column":3},"end":{"line":158,"column":31}},"91":{"start":{"line":162,"column":1},"end":{"line":167,"column":3}},"92":{"start":{"line":163,"column":2},"end":{"line":166,"column":3}},"93":{"start":{"line":164,"column":3},"end":{"line":164,"column":66}},"94":{"start":{"line":165,"column":3},"end":{"line":165,"column":39}},"95":{"start":{"line":169,"column":1},"end":{"line":169,"column":25}},"96":{"start":{"line":170,"column":1},"end":{"line":170,"column":16}},"97":{"start":{"line":171,"column":1},"end":{"line":171,"column":6}},"98":{"start":{"line":174,"column":16},"end":{"line":180,"column":1}},"99":{"start":{"line":175,"column":1},"end":{"line":175,"column":28}},"100":{"start":{"line":176,"column":1},"end":{"line":178,"column":2}},"101":{"start":{"line":177,"column":2},"end":{"line":177,"column":26}},"102":{"start":{"line":179,"column":1},"end":{"line":179,"column":6}},"103":{"start":{"line":182,"column":0},"end":{"line":193,"column":1}},"104":{"start":{"line":183,"column":1},"end":{"line":183,"column":24}},"105":{"start":{"line":184,"column":1},"end":{"line":184,"column":67}},"106":{"start":{"line":184,"column":45},"end":{"line":184,"column":59}},"107":{"start":{"line":184,"column":62},"end":{"line":184,"column":66}},"108":{"start":{"line":184,"column":27},"end":{"line":184,"column":41}},"109":{"start":{"line":185,"column":1},"end":{"line":187,"column":2}},"110":{"start":{"line":186,"column":2},"end":{"line":186,"column":24}},"111":{"start":{"line":188,"column":1},"end":{"line":188,"column":16}},"112":{"start":{"line":189,"column":1},"end":{"line":189,"column":20}},"113":{"start":{"line":190,"column":1},"end":{"line":190,"column":54}},"114":{"start":{"line":190,"column":43},"end":{"line":190,"column":47}},"115":{"start":{"line":190,"column":50},"end":{"line":190,"column":52}},"116":{"start":{"line":192,"column":1},"end":{"line":192,"column":44}}},"fnMap":{"1":{"name":null,"line":43,"loc":{"start":{"line":43,"column":22},"end":{"line":172,"column":1}}},"2":{"name":null,"line":48,"loc":{"start":{"line":48,"column":1},"end":{"line":50,"column":2}}},"3":{"name":null,"line":52,"loc":{"start":{"line":52,"column":1},"end":{"line":56,"column":2}}},"4":{"name":null,"line":58,"loc":{"start":{"line":58,"column":1},"end":{"line":73,"column":2}}},"5":{"name":null,"line":75,"loc":{"start":{"line":75,"column":1},"end":{"line":80,"column":2}}},"6":{"name":null,"line":82,"loc":{"start":{"line":82,"column":20},"end":{"line":102,"column":2}}},"7":{"name":null,"line":104,"loc":{"start":{"line":104,"column":21},"end":{"line":114,"column":2}}},"8":{"name":null,"line":116,"loc":{"start":{"line":116,"column":22},"end":{"line":118,"column":2}}},"9":{"name":null,"line":120,"loc":{"start":{"line":120,"column":17},"end":{"line":123,"column":2}}},"10":{"name":null,"line":125,"loc":{"start":{"line":125,"column":22},"end":{"line":130,"column":2}}},"11":{"name":null,"line":132,"loc":{"start":{"line":132,"column":18},"end":{"line":139,"column":2}}},"12":{"name":null,"line":141,"loc":{"start":{"line":141,"column":23},"end":{"line":146,"column":2}}},"13":{"name":null,"line":148,"loc":{"start":{"line":148,"column":20},"end":{"line":153,"column":2}}},"14":{"name":null,"line":155,"loc":{"start":{"line":155,"column":20},"end":{"line":160,"column":2}}},"15":{"name":null,"line":162,"loc":{"start":{"line":162,"column":34},"end":{"line":167,"column":2}}},"16":{"name":null,"line":174,"loc":{"start":{"line":174,"column":16},"end":{"line":180,"column":1}}},"17":{"name":null,"line":182,"loc":{"start":{"line":182,"column":15},"end":{"line":193,"column":1}}}},"branchMap":{"1":{"line":53,"type":"if","locations":[{"start":{"line":53,"column":31},"end":{"line":55,"column":3}},{"start":{"line":53,"column":31},"end":{"line":55,"column":3}}]},"2":{"line":59,"type":"if","locations":[{"start":{"line":59,"column":33},"end":{"line":71,"column":3}},{"start":{"line":59,"column":33},"end":{"line":71,"column":3}}]},"3":{"line":61,"type":"if","locations":[{"start":{"line":61,"column":44},"end":{"line":65,"column":5}},{"start":{"line":61,"column":44},"end":{"line":65,"column":5}}]},"4":{"line":65,"type":"if","locations":[{"start":{"line":65,"column":49},"end":{"line":69,"column":5}},{"start":{"line":65,"column":49},"end":{"line":69,"column":5}}]},"5":{"line":76,"type":"if","locations":[{"start":{"line":76,"column":33},"end":{"line":78,"column":3}},{"start":{"line":76,"column":33},"end":{"line":78,"column":3}}]},"6":{"line":83,"type":"if","locations":[{"start":{"line":83,"column":35},"end":{"line":86,"column":3}},{"start":{"line":83,"column":35},"end":{"line":86,"column":3}}]},"7":{"line":88,"type":"if","locations":[{"start":{"line":88,"column":43},"end":{"line":97,"column":3}},{"start":{"line":88,"column":43},"end":{"line":97,"column":3}}]},"8":{"line":89,"type":"if","locations":[{"start":{"line":89,"column":23},"end":{"line":96,"column":4}},{"start":{"line":89,"column":23},"end":{"line":96,"column":4}}]},"9":{"line":91,"type":"if","locations":[{"start":{"line":91,"column":28},"end":{"line":94,"column":6}},{"start":{"line":91,"column":28},"end":{"line":94,"column":6}}]},"10":{"line":100,"type":"cond-expr","locations":[{"start":{"line":100,"column":16},"end":{"line":100,"column":38}},{"start":{"line":100,"column":16},"end":{"line":100,"column":38}}]},"11":{"line":105,"type":"cond-expr","locations":[{"start":{"line":105,"column":16},"end":{"line":105,"column":38}},{"start":{"line":105,"column":16},"end":{"line":105,"column":38}}]},"12":{"line":107,"type":"if","locations":[{"start":{"line":107,"column":30},"end":{"line":112,"column":3}},{"start":{"line":107,"column":30},"end":{"line":112,"column":3}}]},"13":{"line":109,"type":"if","locations":[{"start":{"line":109,"column":29},"end":{"line":111,"column":4}},{"start":{"line":109,"column":29},"end":{"line":111,"column":4}}]},"14":{"line":126,"type":"if","locations":[{"start":{"line":126,"column":38},"end":{"line":129,"column":3}},{"start":{"line":126,"column":38},"end":{"line":129,"column":3}}]},"15":{"line":133,"type":"if","locations":[{"start":{"line":133,"column":38},"end":{"line":138,"column":3}},{"start":{"line":133,"column":38},"end":{"line":138,"column":3}}]},"16":{"line":142,"type":"if","locations":[{"start":{"line":142,"column":38},"end":{"line":145,"column":3}},{"start":{"line":142,"column":38},"end":{"line":145,"column":3}}]},"17":{"line":149,"type":"if","locations":[{"start":{"line":149,"column":41},"end":{"line":152,"column":3}},{"start":{"line":149,"column":41},"end":{"line":152,"column":3}}]},"18":{"line":156,"type":"if","locations":[{"start":{"line":156,"column":40},"end":{"line":159,"column":3}},{"start":{"line":156,"column":40},"end":{"line":159,"column":3}}]},"19":{"line":163,"type":"if","locations":[{"start":{"line":163,"column":44},"end":{"line":166,"column":3}},{"start":{"line":163,"column":44},"end":{"line":166,"column":3}}]},"20":{"line":176,"type":"if","locations":[{"start":{"line":176,"column":27},"end":{"line":178,"column":2}},{"start":{"line":176,"column":27},"end":{"line":178,"column":2}}]},"21":{"line":184,"type":"cond-expr","locations":[{"start":{"line":184,"column":18},"end":{"line":184,"column":66}},{"start":{"line":184,"column":18},"end":{"line":184,"column":66}}]},"22":{"line":184,"type":"binary-expr","locations":[{"start":{"line":184,"column":19},"end":{"line":184,"column":23}},{"start":{"line":184,"column":19},"end":{"line":184,"column":23}}]},"23":{"line":185,"type":"if","locations":[{"start":{"line":185,"column":30},"end":{"line":187,"column":2}},{"start":{"line":185,"column":30},"end":{"line":187,"column":2}}]},"24":{"line":190,"type":"cond-expr","locations":[{"start":{"line":190,"column":36},"end":{"line":190,"column":52}},{"start":{"line":190,"column":36},"end":{"line":190,"column":52}}]}}}');
		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}

	_cover__();

	var defaultOpts = (++_cover__().s['1'], {
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
	});

	var self = (++_cover__().s['2'], {});
	++_cover__().s['3'];
	self.opts = {};
	++_cover__().s['4'];
	self.emitEvents = {};
	++_cover__().s['5'];
	self.saxOptions = {};
	++_cover__().s['6'];
	self.tagFilter = null;
	++_cover__().s['7'];
	self.mustPrint = false;
	++_cover__().s['8'];
	self.level = 0;
	++_cover__().s['9'];
	self.nestLevel = 0;

	var lastChunk = (++_cover__().s['10'], '');
	var decoder = (++_cover__().s['11'], new string_decoder.StringDecoder('utf8'));
	var parser = void 0;

	var transformStream = (++_cover__().s['12'], function (chunk, enc, cb) {
		++_cover__().f['1'];
		++_cover__().s['13'];

		parser = sax.createStream(self.opts.strict, self.opts.saxOptions);
		++_cover__().s['14'];
		lastChunk += decoder.write(chunk);
		var me = (++_cover__().s['15'], this);

		function entityQuotes(str) {
			++_cover__().f['2'];
			++_cover__().s['16'];

			return str.replace('"', '&quot;');
		}

		function print(xml) {
			++_cover__().f['3'];
			++_cover__().s['17'];

			if (self.mustPrint === true) {
				++_cover__().b['1'][0];
				++_cover__().s['18'];

				me.push(eol(indent(xml)));
			} else {
				++_cover__().b['1'][1];
			}
		}

		function indent(xml) {
			++_cover__().f['4'];
			++_cover__().s['19'];

			if (self.opts.pretty === true) {
				++_cover__().b['2'][0];
				++_cover__().s['20'];

				for (var j = (++_cover__().s['22'], self.level); j > 0; ++_cover__().s['21'], j--) {
					++_cover__().s['23'];

					if (self.opts.indentStyle === 'spaces') {
						++_cover__().b['3'][0];
						++_cover__().s['24'];

						for (var i = (++_cover__().s['26'], 0); i < self.opts.indentSpaces; ++_cover__().s['25'], i++) {
							++_cover__().s['27'];

							xml = ' ' + xml;
						}
					} else {
							++_cover__().b['3'][1];
							++_cover__().s['28'];
							if (self.opts.indentStyle === 'tabs') {
								++_cover__().b['4'][0];
								++_cover__().s['29'];

								for (var _i = (++_cover__().s['31'], 0); _i < self.opts.indentTabs; ++_cover__().s['30'], _i++) {
									++_cover__().s['32'];

									xml = '\t' + xml;
								}
							} else {
								++_cover__().b['4'][1];
							}
						}
				}
			} else {
				++_cover__().b['2'][1];
			}
			++_cover__().s['33'];
			return xml;
		}

		function eol(xml) {
			++_cover__().f['5'];
			++_cover__().s['34'];

			if (self.opts.pretty === true) {
				++_cover__().b['5'][0];
				++_cover__().s['35'];

				xml += '\n';
			} else {
				++_cover__().b['5'][1];
			}
			++_cover__().s['36'];
			return xml;
		}

		++_cover__().s['37'];
		parser.onopentag = function (tag) {
			++_cover__().f['6'];
			++_cover__().s['38'];

			if (tag.name === self.tagFilter) {
				++_cover__().b['6'][0];
				++_cover__().s['39'];

				self.mustPrint = true;
				++_cover__().s['40'];
				self.nestLevel += 1;
			} else {
				++_cover__().b['6'][1];
			}
			var printable = (++_cover__().s['41'], '<' + tag.name);
			++_cover__().s['42'];
			if (self.opts.stripAttributes === false) {
				++_cover__().b['7'][0];
				++_cover__().s['43'];

				if (tag.attributes) {
					++_cover__().b['8'][0];
					++_cover__().s['44'];

					for (var i in tag.attributes) {
						++_cover__().s['45'];

						if (tag.attributes[i]) {
							++_cover__().b['9'][0];
							++_cover__().s['46'];

							printable += ' ' + i + '="';
							++_cover__().s['47'];
							printable += entityQuotes(tag.attributes[i]) + '"';
						} else {
							++_cover__().b['9'][1];
						}
					}
				} else {
					++_cover__().b['8'][1];
				}
			} else {
				++_cover__().b['7'][1];
			}
			++_cover__().s['48'];
			printable += '>';
			++_cover__().s['49'];
			print(printable);
			++_cover__().s['50'];
			self.level += self.mustPrint ? (++_cover__().b['10'][0], (++_cover__().s['51'], 1)) : (++_cover__().b['10'][1], (++_cover__().s['52'], 0));
			++_cover__().s['53'];
			me.emit('openTag', tag);
		};

		++_cover__().s['54'];
		parser.onclosetag = function (tag) {
			++_cover__().f['7'];
			++_cover__().s['55'];

			self.level -= self.mustPrint ? (++_cover__().b['11'][0], (++_cover__().s['56'], 1)) : (++_cover__().b['11'][1], (++_cover__().s['57'], 0));
			++_cover__().s['58'];
			print('</' + tag + '>');
			++_cover__().s['59'];
			if (tag === self.tagFilter) {
				++_cover__().b['12'][0];
				++_cover__().s['60'];

				self.nestLevel -= 1;
				++_cover__().s['61'];
				if (self.nestLevel === 0) {
					++_cover__().b['13'][0];
					++_cover__().s['62'];

					self.mustPrint = false;
				} else {
					++_cover__().b['13'][1];
				}
			} else {
				++_cover__().b['12'][1];
			}
			++_cover__().s['63'];
			me.emit('closeTag', tag);
		};

		++_cover__().s['64'];
		parser.onattribute = function (attr) {
			++_cover__().f['8'];
			++_cover__().s['65'];

			me.emit('attribute', attr);
		};

		++_cover__().s['66'];
		parser.ontext = function (text) {
			++_cover__().f['9'];
			++_cover__().s['67'];

			print(text);
			++_cover__().s['68'];
			me.emit('text', text);
		};

		++_cover__().s['69'];
		parser.onopencdata = function () {
			++_cover__().f['10'];
			++_cover__().s['70'];

			if (self.opts.stripCdata === false) {
				++_cover__().b['14'][0];
				++_cover__().s['71'];

				print('<![CDATA[');
				++_cover__().s['72'];
				me.emit('openCdata');
			} else {
				++_cover__().b['14'][1];
			}
		};

		++_cover__().s['73'];
		parser.oncdata = function (text) {
			++_cover__().f['11'];
			++_cover__().s['74'];

			if (self.opts.stripCdata === false) {
				++_cover__().b['15'][0];
				++_cover__().s['75'];

				self.level += 1;
				++_cover__().s['76'];
				print(text);
				++_cover__().s['77'];
				self.level -= 1;
				++_cover__().s['78'];
				me.emit('cdata', text);
			} else {
				++_cover__().b['15'][1];
			}
		};

		++_cover__().s['79'];
		parser.onclosecdata = function () {
			++_cover__().f['12'];
			++_cover__().s['80'];

			if (self.opts.stripCdata === false) {
				++_cover__().b['16'][0];
				++_cover__().s['81'];

				print(']]>');
				++_cover__().s['82'];
				me.emit('closeCdata');
			} else {
				++_cover__().b['16'][1];
			}
		};

		++_cover__().s['83'];
		parser.oncomment = function (comment) {
			++_cover__().f['13'];
			++_cover__().s['84'];

			if (self.opts.stripComments === false) {
				++_cover__().b['17'][0];
				++_cover__().s['85'];

				print('<!-- ' + comment + ' -->');
				++_cover__().s['86'];
				me.emit('comment', comment);
			} else {
				++_cover__().b['17'][1];
			}
		};

		++_cover__().s['87'];
		parser.ondoctype = function (doctype) {
			++_cover__().f['14'];
			++_cover__().s['88'];

			if (self.opts.stripDoctype === false) {
				++_cover__().b['18'][0];
				++_cover__().s['89'];

				print('<!DOCTYPE' + doctype + '>');
				++_cover__().s['90'];
				me.emit('doctype', doctype);
			} else {
				++_cover__().b['18'][1];
			}
		};

		++_cover__().s['91'];
		parser.onprocessinginstruction = function (instruction) {
			++_cover__().f['15'];
			++_cover__().s['92'];

			if (self.opts.stripInstruction === false) {
				++_cover__().b['19'][0];
				++_cover__().s['93'];

				print('<?' + instruction.name + ' ' + instruction.body + '?>');
				++_cover__().s['94'];
				me.emit('instruction', instruction);
			} else {
				++_cover__().b['19'][1];
			}
		};

		++_cover__().s['95'];
		parser.write(lastChunk);
		++_cover__().s['96'];
		lastChunk = '';
		++_cover__().s['97'];
		cb();
	});

	var endStream = (++_cover__().s['98'], function (cb) {
		++_cover__().f['16'];
		++_cover__().s['99'];

		lastChunk += decoder.end();
		++_cover__().s['100'];
		if (lastChunk.length > 0) {
			++_cover__().b['20'][0];
			++_cover__().s['101'];

			parser.write(lastChunk);
		} else {
			++_cover__().b['20'][1];
		}
		++_cover__().s['102'];
		cb();
	});

	++_cover__().s['103'];
	function index (opts) {
		++_cover__().f['17'];
		++_cover__().s['104'];

		self.mustPrint = false;
		++_cover__().s['105'];
		self.tagFilter = (++_cover__().b['22'][0], opts) && (++_cover__().b['22'][1], (++_cover__().s['108'], opts.tagFilter)) ? (++_cover__().b['21'][0], (++_cover__().s['106'], opts.tagFilter)) : (++_cover__().b['21'][1], (++_cover__().s['107'], null));
		++_cover__().s['109'];
		if (self.tagFilter === null) {
			++_cover__().b['23'][0];
			++_cover__().s['110'];

			self.mustPrint = true;
		} else {
			++_cover__().b['23'][1];
		}
		++_cover__().s['111'];
		self.level = 0;
		++_cover__().s['112'];
		self.nestLevel = 0;
		++_cover__().s['113'];
		deepAssign(self.opts, defaultOpts, opts ? (++_cover__().b['24'][0], (++_cover__().s['114'], opts)) : (++_cover__().b['24'][1], (++_cover__().s['115'], {})));

		++_cover__().s['116'];
		return through(transformStream, endStream);
	}

	exports['default'] = index;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=muxml.js.map