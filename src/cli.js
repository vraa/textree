'use strict';

const fs = require('fs');
const path = require('path');
const EXCLUSION_LIST = ['.git', 'node_modules'];
let textree = require('./js/textree');
let folder = __dirname;
let data = {};

let args = process.argv;
let params = [];

for (let arg = 0; arg < args.length; arg++) {
    if (arg > 1) {
        params.push(args[arg]);
    }
}

if (params.length === 0) {
    usage();
    process.exit();
}

let folderToWalk = params[0];

function walk(folder, data) {
    let folderContents = fs.readdirSync(folder);
    let noOfContents = folderContents.length;
    let folderName = path.basename(folder);


    data.name = folderName;
    data.contents = [];

    if (EXCLUSION_LIST.indexOf(folderName) != -1) {
        return data;
    }


    for (let i = 0; i < noOfContents; i++) {
        let content = folderContents[i];
        let contentPath = path.join(folder, content);
        let isFolder = fs.lstatSync(contentPath).isDirectory();
        if (isFolder) {
            data.contents.push(walk(contentPath, {}));
        } else {
            data.contents.push(content);
        }
    }
    return data;
}

function usage() {
    console.log('Usage');
}


walk(folderToWalk, data);
console.log(textree(data));



