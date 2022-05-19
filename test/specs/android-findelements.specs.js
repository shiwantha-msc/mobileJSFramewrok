
const wdio = require('webdriverio');

describe('', ()=> {

    it('Sample Test', async ()=> {
        //find element by accessibility id
        const appOption = await $('~App');

        //click on selected element
        await appOption.click();

        //assertion usage for value
        const appExpectedEle = await $('~Alarm');
        await expect(appExpectedEle).toBeExisting();

    });

});