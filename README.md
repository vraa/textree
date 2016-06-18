
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url]

[![NPM][nodei-image]][nodei-url]

## Install

```bash
npm install -g textree
```

## Usage

In command line, `cd` into the directory for which you want to generate the tree structure, and run
```bash
textree
```
and you will get the below output (example):

<pre>
🗁 src
  |--🗁 js
  |  `--🗎 textree.js
  |--🗁 scss
  |  `--🗎 main.scss
  |--🗎 cli.js
  `--🗎 main.js
</pre>

By default, it will process the current directory. You can even pass a different folder.

```bash
textree D:/workspace/textree
```
<pre>
🗁 textree
  |--🗀 .git
  |--🗀 node_modules
  |--🗁 resources
  |  `--🗁 js
  |  |  `--🗎 bundle.js
  |--🗁 src
  |  |--🗁 js
  |  |  `--🗎 textree.js
  |  |--🗁 scss
  |  |  `--🗎 main.scss
  |  |--🗎 cli.js
  |  `--🗎 main.js
  |--🗎 .gitignore
  |--🗎 index.html
  |--🗎 LICENSE
  |--🗎 npm-debug.log
  |--🗎 package.json
  |--🗎 README.md
  |--🗎 textree.iml
  `--🗎 webpack.config.js
</pre>

## Gotcha

It will not process the following folders, as they tend to be deeper than the *Mariana Trench*.

* .git
* node_modules
* .sass-cache
