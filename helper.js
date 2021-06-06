// Get modules node
const mkdirp = require('mkdirp');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function createFolder(path) {
    try {
        mkdirp(path);
    } catch (ex) {
        // eslint-disable-next-line no-console
        console.log(ex);
    }
}

module.exports = {
    sleep,
    createFolder,
};
