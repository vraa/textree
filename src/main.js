'use strict';

let textree = require('./js/textree');

var data = {
    app: {
        js: {
            _: ['main.js'],
            lib: {
                _: ['jquery.js']
            }
        },
        bar: {
            _: ['foo.js']
        },
        _: ['package.json', 'index.html']
    }
};

console.log(textree(data));