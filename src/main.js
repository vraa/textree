'use strict';

require('./scss/main.scss');

let textree = require('./js/textree');

var data = {
    "name": ".",
    "contents": [
        {
            "name": ".git",
            "contents": []
        },
        ".gitignore",
        "index.html",
        "LICENSE",
        {
            "name": "node_modules",
            "contents": []
        },
        "npm-debug.log",
        "package.json",
        "README.md",
        {
            "name": "resources",
            "contents": [
                {
                    "name": "js",
                    "contents": [
                        "bundle.js"
                    ]
                }
            ]
        },
        {
            "name": "src",
            "contents": [
                "cli.js",
                {
                    "name": "js",
                    "contents": [
                        "textree.js"
                    ]
                },
                "main.js",
                {
                    "name": "scss",
                    "contents": [
                        "main.scss"
                    ]
                }
            ]
        },
        "textree.iml",
        "webpack.config.js"
    ]
};

console.log(textree(data));