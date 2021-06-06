// Get modules node
const path = require('path');
const mkdirp = require('mkdirp');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const folderName = `${new Date().toISOString().replace(/:/g, '_')}`;
let imageIndex = 0;

const getScreenshotOptions = function getScreenshotOptions() {
    return {
        path: `Images\\${folderName}\\img${imageIndex++}.png`,
    };
};

function CreateFolderImageName() {
    try {
        const fullpath = `Images\\${folderName}`;
        mkdirp(fullpath);
    } catch (ex) {
        console.log(ex);
    }
}

module.exports = {
    sleep,
    getScreenshotOptions,
    CreateFolderImageName,
};
