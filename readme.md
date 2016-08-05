# muxml [![Build Status Travis](https://travis-ci.org/t1st3/muxml.svg?branch=master)](https://travis-ci.org/t1st3/muxml) [![Coverage Status](https://coveralls.io/repos/github/t1st3/muxml/badge.svg?branch=master)](https://coveralls.io/github/t1st3/muxml?branch=master)

> Streaming XML parser and formatter

`muxml` is a [Transform stream](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams) that accepts XML strings, and emits small chunks containing individual XML elements.

The parser part of this module is built on [`sax`](https://www.npmjs.com/package/sax).
On parsing, the stream is broken-up and reassembled so that each opening/closing tag is a chunk. During this process, sax events are re-emitted and are listenable down the pipeline.

Once XML is parsed, this module can optionally format XML in the following fashions:

* XML minification (de-indentation and removal of newlines)
* XML beautification (indentation and usage of newlines)
* striping of comments
* striping of `CDATA`
* striping of instruction (like `<?xml foo="blerg" ?>`) tags
* striping of `<!DOCTYPE` declarations
* striping of attributes
* tag filtering based on tag name

`muxml` is written with ES6/ES2015 syntax, although it is also shipped as an ES5 module with UMD syntax, meaning it can also be used:

* in Node.js >= 4
* in the browser, as global script
* in the browser, with an AMD loader

## Install

```
$ npm install --save muxml
```

## Usage

Suppose a file named example.xml containing the follwing XML

```xml
<a id="foo">
	<b>
		<c>d</c>
	</b>
</a>
```

then, `muxml()` return a transform stream that accepts XML strings and emits XML elements as strings

```js
const muxml = require('muxml');

fs.createReadStream('example.xml')
	.pipe(muxml({pretty: false}))
	.on('data', function (data) {
		console.log(data);
		//=> '<b><c>d</c></b>'
	});
```

## Options

### strict

Type: `boolean`<br>
Default: `true`

Set [`sax` parser `strict` argument](https://www.npmjs.com/package/sax#arguments)

### pretty

Type: `boolean`<br>
Default: `true`

Prettify the output. If true, output has newlines and indentation.

### indentStyle

Type: `string`<br>
Default: `spaces`

When `pretty` is set to true, indent with either `spaces` or `tabs`.

### indentSpaces

Type: `integer`<br>
Default: `2`

When `pretty` is set to true and `indentStyle` is set to `spaces`, then indent with this number of spaces.

### indentTabs

Type: `integer`<br>
Default: `1`

When `pretty` is set to true and `indentStyle` is set to `tabs`, then indent with this number of tabs.

#### filter

Type: `string`<br>
Default: `null`<br>
a filter for tag names

Filter XML with tags with name matching the filter.

### stripAttributes

Type: `boolean`<br>
Default: `false`

Strip attributes from tags.

### stripCdata

Type: `boolean`<br>
Default: `true`

Strip `CDATA` tags.

### stripComments

Type: `boolean`<br>
Default: `true`

Strip XML comments.

### stripDoctype

Type: `boolean`<br>
Default: `true`

Strip `<!DOCTYPE` declarations.

### stripInstruction

Type: `boolean`<br>
Default: `true`

Strip processing instruction (like `<?xml foo="blerg" ?>`) tags.

### saxOptions

Type: `object`<br>
Default: `{}`

Set [options of `sax` parser](https://www.npmjs.com/package/sax#arguments). Note that `trim` can not be set to `false`.


## API

### muxml(options)

#### options

Type: `object`<br>
as described above


## Relevant

* [muxml-cli](https://github.com/t1st3/muxml-cli) | CLI for this module
* [gulp-muxml](https://github.com/t1st3/gulp-muxml) | this module as a [`gulp`](http://gulpjs.com/) plugin

## License

MIT © [t1st3](http://tiste.org)
