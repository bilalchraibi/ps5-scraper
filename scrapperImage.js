const helpers = require('./helper');

module.exports = class ScrapperImage {
    constructor() {
        this.imageIndex = 0;
        // Create a folder with the current date to store the images that are captured during the scrapping.
        this.folderPath = `${new Date().toISOString().replace(/:/g, '_')}`;
    }

    getImageFullPath() {
        return `Images\\${this.folderPath}\\img${this.imageIndex++}.png`;
    }

    createImagesFolder() {
        helpers.createFolder(`Images\\${this.folderPath}`);
    }
};
