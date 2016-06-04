'use strict';

let path = require('path');
let PROJECT_DIR = __dirname;

module.exports = {
    entry: path.join(PROJECT_DIR, 'src', 'main.js'),
    output: {
        path: path.join(PROJECT_DIR, 'resources', 'js'),
        filename: 'bundle.js',
        publicPath: '/resources/js'
    }
};