
import {strictEqual, deepEqual} from 'assert';
import fs from 'fs';
import concatStream from 'concat-stream';
import muxml from '../dist/muxml.js';

/* global describe,it */

describe('muxml', () => {
	it('streams correct XML', done => {
		const expected = '<a id="aa"><b><c>d</c></b></a>';
		const mux = muxml({pretty: false});
		let elements = 0;
		mux.on('data', () => {
			elements += 1;
		});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			strictEqual(elements, 7);
			done();
		}));
		const xml = [
			'<a id="aa">', '<b>', '<c>d</c>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct XML without attributes', done => {
		const expected = '<a><b><c>d</c></b></a>';
		const mux = muxml({pretty: false, stripAttributes: true});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		const xml = [
			'<a id="aa">', '<b>', '<c>d</c>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct XML with CDATA, comment, doctype, ...', done => {
		let expected = '<?xml foo="blerg" ?><!DOCTYPE HTML PUBLIC ';
		expected += '"-//W3C//DTD HTML 4.01//EN"\n"http://www.w3.org/TR/';
		expected += 'html4/strict.dtd"><a id="aa"><![CDATA[ my-cdata ]]>';
		expected += '<b>c</b><!-- my-comment --></a>';
		const mux = muxml({
			pretty: false,
			stripCdata: false,
			stripComments: false,
			stripDoctype: false,
			stripInstruction: false
		});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		const xml = [
			'<?xml foo="blerg" ?>',
			'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"',
			'"http://www.w3.org/TR/html4/strict.dtd">',
			'<a id="aa">', '<![CDATA[ my-cdata ]]>', '<b>c</b>',
			'<!-- my-comment -->', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct nested XML tags', done => {
		const expected = '<b><a><b><b><c>d</c></b></b></a></b>';
		const mux = muxml({pretty: false, tagFilter: 'b'});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		const xml = [
			'<a id="aa">', '<b>', '<a>', '<b>', '<b>', '<c>d</c>', '</b>',
			'</b>', '</a>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct multiple XML tags', done => {
		let expected = '<b><c><a><b><c>d</c></b></a></c></b><b><e>';
		expected += 'f</e></b><b attr="foo">h</b>';
		const mux = muxml({pretty: false, tagFilter: 'b'});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		const xml = [
			'<a id="aa">', '<b>', '<c>', '<a>', '<b>', '<c>d</c>', '</b>',
			'</a>', '</c>', '</b>', '<b>', '<e>f</e>', '</b>', '<g>',
			'<b attr="foo">h</b>', '</g>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('streams correct prettified XML with 4-space indentation', done => {
		const expected = [
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
		const mux = muxml({
			pretty: true,
			stripCdata: false,
			indentSpaces: 4,
			stripInstruction: false,
			stripComments: false
		});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		let xml = '<?xml foo="blerg" ?><a id="aa"><!-- my-comment -->';
		xml += '<b><![CDATA[my-cdata]]><c>d</c></b></a>';
		mux.end(xml);
	});

	it('streams correct prettified XML with 2-tab indentation', done => {
		const expected = [
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
		const mux = muxml({
			pretty: true,
			stripCdata: false,
			indentStyle: 'tabs',
			indentTabs: 2,
			stripInstruction: false,
			stripComments: false
		});
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		let xml = '<?xml foo="blerg" ?><a id="aa"><!-- my-comment -->';
		xml += '<b><![CDATA[my-cdata]]><c>d</c></b></a>';
		mux.end(xml);
	});

	it('streams correct XML without options', done => {
		const expected = '<a id="aa">\n  <b>\n    c\n  </b>\n</a>\n';
		const mux = muxml();
		mux.pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, expected);
			done();
		}));
		const xml = [
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
		const expected = [
			{name: 'a', attributes: {id: 'aa'}, isSelfClosing: false},
			{name: 'b', attributes: {}, isSelfClosing: false},
			{name: 'c', attributes: {}, isSelfClosing: false}
		];
		const attributes = [];
		const tags = [];
		const comments = [];
		const doctypes = [];
		const instructions = [];
		const closed = [];
		let openCdata = 0;
		let closeCdata = 0;
		let cdata = '';
		const mux = muxml({
			pretty: false,
			stripComments: false,
			stripCdata: false,
			stripDoctype: false,
			stripInstruction: false
		});
		mux.on('opentag', tag => {
			tags.push(tag);
		}).on('closetag', tag => {
			closed.push(tag);
		}).on('comment', comment => {
			comments.push(comment);
		}).on('doctype', doctype => {
			doctypes.push(doctype);
		}).on('instruction', instruction => {
			instructions.push(instruction.body);
		}).on('opencdata', () => {
			openCdata += 1;
		}).on('closecdata', () => {
			closeCdata += 1;
		}).on('cdata', text => {
			cdata = text;
		}).on('attribute', attr => {
			attributes.push(attr);
		}).on('finish', () => {
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
		const xml = [
			'<!DOCTYPE my-doctype="foo">', '<?xml foo="blerg" ?>', '<a id="aa">',
			'<!-- my-comment -->', '<b>', '<c>d</c>',
			'<![CDATA[ my-cdata ]]>', '</b>', '</a>'
		].join('\n');
		mux.end(xml);
	});

	it('pipes correctly', done => {
		const stream = fs.createReadStream('test/fixture.xml');
		stream.pipe(muxml({
			pretty: false
		})).pipe(concatStream({encoding: 'string'}, data => {
			strictEqual(data, '<c><b>a</b></c>');
			done();
		}));
	});
});
