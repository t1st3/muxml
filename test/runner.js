
import {strictEqual, deepEqual} from 'assert';
import fs from 'fs';
import concatStream from 'concat-stream';
import muxml from '../dist/muxml.js';

/* global describe,it */

describe('muxml', () => {
	it('streams correct XML', done => {
		var expected = '<a id="aa"><b><c>d</c></b></a>';
		var mux = muxml({pretty: false});
		var elements = 0;
		mux.on('data', function () {
			elements += 1;
		});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			strictEqual(elements, 7);
			done();
		}));
		var xml = [
			'<a id="aa">', '<b>', '<c>d</c>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct XML without attributes', done => {
		var expected = '<a><b><c>d</c></b></a>';
		var mux = muxml({pretty: false, stripAttributes: true});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = [
			'<a id="aa">', '<b>', '<c>d</c>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct XML with CDATA, comment, doctype, ...', done => {
		var expected = '<?xml foo="blerg" ?><!DOCTYPE HTML PUBLIC ';
		expected += '"-//W3C//DTD HTML 4.01//EN"\n"http://www.w3.org/TR/';
		expected += 'html4/strict.dtd"><a id="aa"><![CDATA[ my-cdata ]]>';
		expected += '<b>c</b><!-- my-comment --></a>';
		var mux = muxml({
			pretty: false,
			stripCdata: false,
			stripComments: false,
			stripDoctype: false,
			stripInstruction: false
		});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = [
			'<?xml foo="blerg" ?>',
			'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"',
			'"http://www.w3.org/TR/html4/strict.dtd">',
			'<a id="aa">', '<![CDATA[ my-cdata ]]>', '<b>c</b>',
			'<!-- my-comment -->', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct nested XML tags', done => {
		var expected = '<b><a><b><b><c>d</c></b></b></a></b>';
		var mux = muxml({pretty: false, tagFilter: 'b'});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = [
			'<a id="aa">', '<b>', '<a>', '<b>', '<b>', '<c>d</c>', '</b>',
			'</b>', '</a>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct multiple XML tags', done => {
		var expected = '<b><c><a><b><c>d</c></b></a></c></b><b><e>';
		expected += 'f</e></b><b attr="foo">h</b>';
		var mux = muxml({pretty: false, tagFilter: 'b'});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = [
			'<a id="aa">', '<b>', '<c>', '<a>', '<b>', '<c>d</c>', '</b>',
			'</a>', '</c>', '</b>', '<b>', '<e>f</e>', '</b>', '<g>',
			'<b attr="foo">h</b>', '</g>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct prettified XML with 4-space indentation', done => {
		var expected = [
			'<?xml foo="blerg" ?>',
			'<a id="aa">',
			'    <!-- my-comment -->',
			'    <b>',
			'        <![CDATA[',
			'            my-cdata',
			'        ]]>',
			'        <c>',
			'            d',
			'        </c>',
			'    </b>',
			'</a>\n'
		].join('\n');
		var mux = muxml({
			pretty: true,
			stripCdata: false,
			indentSpaces: 4,
			stripInstruction: false,
			stripComments: false
		});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = '<?xml foo="blerg" ?><a id="aa"><!-- my-comment -->';
		xml += '<b><![CDATA[my-cdata]]><c>d</c></b></a>';
		mux.end(xml);
	});

	it('streams correct prettified XML with 2-tab indentation', done => {
		var expected = [
			'<?xml foo="blerg" ?>',
			'<a id="aa">',
			'\t\t<!-- my-comment -->',
			'\t\t<b>',
			'\t\t\t\t<![CDATA[',
			'\t\t\t\t\t\tmy-cdata',
			'\t\t\t\t]]>',
			'\t\t\t\t<c>',
			'\t\t\t\t\t\td',
			'\t\t\t\t</c>',
			'\t\t</b>',
			'</a>\n'
		].join('\n');
		var mux = muxml({
			pretty: true,
			stripCdata: false,
			indentStyle: 'tabs',
			indentTabs: 2,
			stripInstruction: false,
			stripComments: false
		});
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = '<?xml foo="blerg" ?><a id="aa"><!-- my-comment -->';
		xml += '<b><![CDATA[my-cdata]]><c>d</c></b></a>';
		mux.end(xml);
	});

	it('streams correct XML without options', done => {
		var expected = '<a id="aa">\n  <b>\n    c\n  </b>\n</a>\n';
		var mux = muxml();
		mux.pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, expected);
			done();
		}));
		var xml = [
			'<?xml foo="blerg" ?>',
			'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"',
			'"http://www.w3.org/TR/html4/strict.dtd">',
			'<a id="aa">',
			'<![CDATA[ my-cdata ]]>',
			'<b>c</b>',
			'<!-- my-comment -->',
			'</a>'
		].join('\n');
		mux.end(xml);
	});

	it('emits correctly', done => {
		var expected = [
			{name: 'a', attributes: {id: 'aa'}, isSelfClosing: false},
			{name: 'b', attributes: {}, isSelfClosing: false},
			{name: 'c', attributes: {}, isSelfClosing: false}
		];
		var attributes = [];
		var tags = [];
		var comments = [];
		var doctypes = [];
		var instructions = [];
		var closed = [];
		var openCdata = 0;
		var closeCdata = 0;
		var cdata = '';
		var mux = muxml({
			pretty: false,
			stripComments: false,
			stripCdata: false,
			stripDoctype: false,
			stripInstruction: false
		});
		mux.on('openTag', function (tag) {
			tags.push(tag);
		}).on('closeTag', function (tag) {
			closed.push(tag);
		}).on('comment', function (comment) {
			comments.push(comment);
		}).on('doctype', function (doctype) {
			doctypes.push(doctype);
		}).on('instruction', function (instruction) {
			instructions.push(instruction.body);
		}).on('openCdata', function () {
			openCdata += 1;
		}).on('closeCdata', function () {
			closeCdata += 1;
		}).on('cdata', function (text) {
			cdata = text;
		}).on('attribute', function (attr) {
			attributes.push(attr);
		}).on('finish', function () {
			deepEqual(tags, expected);
			deepEqual(closed, ['c', 'b', 'a']);
			deepEqual(attributes, [{name: 'id', value: 'aa'}]);
			deepEqual(comments, ['my-comment']);
			deepEqual(doctypes, [' my-doctype="foo"']);
			deepEqual(instructions, ['foo="blerg" ']);
			strictEqual(openCdata, 1);
			strictEqual(closeCdata, 1);
			strictEqual(cdata, ' my-cdata ');
			done();
		});
		var xml = [
			'<!DOCTYPE my-doctype="foo">', '<?xml foo="blerg" ?>', '<a id="aa">',
			'<!-- my-comment -->', '<b>', '<c>d</c>',
			'<![CDATA[ my-cdata ]]>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('pipes correctly', done => {
		var stream = fs.createReadStream('test/fixture.xml');
		stream.pipe(muxml({
			pretty: false
		})).pipe(concatStream({encoding: 'string'}, function (data) {
			strictEqual(data, '<c><b>a</b></c>');
			done();
		}));
	});
});
