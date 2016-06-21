'use strict';

let textree = require('../../../../src/js/textree');
let testData = {
    "name": "test",
    "contents": [
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
        "textree.iml"
    ]
};

describe('textree tests', function () {

    it('should correctly generate text tree from the test data', function () {
        var tranformed = textree(testData);
        expect(tranformed.replace(/\s/g, '')).toEqual('🗁test|--🗀node_modules|--🗁resources|`--🗁js||`--🗎bundle.js|--🗁src||--🗁js||`--🗎textree.js||--🗁scss||`--🗎main.scss||--🗎cli.js|`--🗎main.js|--🗎.gitignore|--🗎index.html|--🗎LICENSE|--🗎npm-debug.log|--🗎package.json|--🗎README.md`--🗎textree.iml');
    });
});