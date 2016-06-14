'use strict';

require('./scss/main.scss');

let textree = require('./js/textree');

var data = {
    name: 'app',
    contents: [
        {
            name: 'source files',
            contents: [
                'main.js',
                'helper.js',
                {
                    name: 'lib',
                    contents: [
                        'jquery.js',
                        'backbone.js',
                        {
                            name: 'newfolder',
                            contents: [
                                'new.js'
                            ]
                        }
                    ]
                },
                {
                    name: 'ObjectFolder',
                    contents: [
                        'hello.js'
                    ]
                }
            ]
        },
        {
            name: 'bar',
            contents: [
                'bar.js'
            ]
        },
        '.gitignore',
        'package.json'
    ]
};

console.log(textree(data));