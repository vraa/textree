'use strict';

const fs = require('fs');
const path = require('path');

const EXCLUSION_LIST = ['.git', 'node_modules', '.sass-cache'];

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

module.exports = walk;