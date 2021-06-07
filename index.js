const { webkit } = require('playwright');
const cron = require('node-cron');
const urls = require('./items-urls');
const helpers = require('./helper');
const ScraperImage = require('./scraperImage');

async function scaper() {
    // Declare variable that will be used during the scrapping
    const imagelogic = new ScraperImage();
    imagelogic.createImagesFolder();
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto(urls.ps5ConsoleUrl);
    // await page.screenshot({ path: `Images\\example${index++}.png` });
    await page.screenshot({ path: imagelogic.getImageFullPath() });
    await page.click('#costcoModalText input[type=radio][value=QC]');
    await page.screenshot({ path: imagelogic.getImageFullPath() });
    await page.click('#language-region-set');
    await helpers.sleep(2000);
    await page.screenshot({ path: imagelogic.getImageFullPath() });
    const outOfStock = await page.$('#add-to-cart input[type=button][value="Out of Stock"][disabled=disabled]');
    if (outOfStock) {
        // Out of luck, the Playstation 5 is not available and we need to perform another attempt... :(
        await page.screenshot({ path: imagelogic.getImageFullPath() });
    } else {
        // Performing the checkout of the cart once the Playstation5 is found
        await page.screenshot({ path: imagelogic.getImageFullPath() });
        await page.click('#add-to-cart');
        await helpers.sleep(2000);
        await page.screenshot({ path: imagelogic.getImageFullPath() });
        const isAddedToCart = await page.$('text=Added to Cart');
        if (isAddedToCart) {
            // Checkout and try to buy the item.
            await page.click('text=      View Cart     ');
            await helpers.sleep(2000);
            await page.screenshot({ path: imagelogic.getImageFullPath() });
            await page.click('#shopCartCheckoutSubmitButton');
            await helpers.sleep(2000);
            await page.screenshot({ path: imagelogic.getImageFullPath() });
        }
    }
    await browser.close();
}

const task = cron.schedule('*/30 * * * * *', async () => {
    await scaper();
    console.log(new Date().toISOString());
});
