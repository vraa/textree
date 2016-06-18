'use strict';

const ITEM_TYPE = {
    FILE: '🗎',
    OPEN_FOLDER: '🗁',
    CLOSED_FOLDER: '🗀'
};
const FILE_SYMBOL = '_';
const NEW_LINE = '\n';
const INDENT = '  ';
const STARTING_DEPTH = 0;
const DEFAULT_OPTIONS = {
    icons: true,
    style: 1
}

let Textree = {

    input: '',
    output: '',


    textree: function (input, options) {
        Textree._init(input, options);
        Textree.output += Textree._formatName(input.name, ITEM_TYPE.OPEN_FOLDER, true) + NEW_LINE;
        Textree._parse(input, STARTING_DEPTH + 1);
        return Textree.output;
    },

    _init: function (input, options) {
        Textree.output = '';
        Textree.input = input;
        Textree.options = options || DEFAULT_OPTIONS;
    },

    _sanitize: function (str) {
        return str;
    },

    _parse: function (folder, depth) {
        let folderContents = Textree._sortFolder(folder.contents);
        let noOfItemsInFolder = folderContents.length;
        let i;

        for (i = 0; i < noOfItemsInFolder; i++) {

            let item = folderContents[i];
            let itemIsAFolder = Textree._isAFolder(item);
            let folderIsEmpty = itemIsAFolder && (item.contents === undefined || item.contents.length === 0);
            let itemName = Textree._sanitize(itemIsAFolder ? Textree._folderName(item) : item);
            let itemType = itemIsAFolder ? (folderIsEmpty ? ITEM_TYPE.CLOSED_FOLDER : ITEM_TYPE.OPEN_FOLDER) : ITEM_TYPE.FILE;
            let isLastItem = ((i + 1) === noOfItemsInFolder);
            let itemIndentation = Textree._indentation(depth, {
                isLastItem: isLastItem
            });
            let formattedItemName = Textree._formatName(itemName, itemType);
            Textree.output += itemIndentation + formattedItemName + NEW_LINE;
            if (itemIsAFolder && !folderIsEmpty) {
                Textree._parse(item, depth + 1);
            }
        }

    },

    _sortFolder: function (contents) {
        let subFolders = [];
        let subFiles = [];
        let noOfItems = contents.length;
        for (let i = 0; i < noOfItems; i++) {
            let item = contents[i];
            if (Textree._isAFolder(item)) {
                subFolders.push(item);
            } else {
                subFiles.push(item);
            }
        }
        subFolders.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        subFiles.sort(function (a, b) {
            return a.localeCompare(b);
        });
        return subFolders.concat(subFiles);

    },

    _formatName: function (name, type, isRoot) {
        let options = Textree.options;
        return (
            (isRoot ? '' : '--')
            + (options.icons && type ? type : '')
            + ' '
            + name
        );
    },

    _isAFolder: function (item) {
        return (typeof item === 'object');
    },

    _folderName: function (folder) {
        if (typeof folder === 'object') {
            return folder.name;
        } else if (typeof folder === 'string') {
            return folder;
        }
    },

    _indentation: function (depth, options) {
        let indent = '';
        let isLastItem = options.isLastItem;
        for (let i = 1; i <= depth; i++) {
            indent += INDENT;
            indent += ( (isLastItem && i === depth) ? '`' : '|');
        }
        return indent;
    }


};

module.exports = Textree.textree;