describe('', ()=> {

    it('', async ()=> {

        //find element by accessibility id
        const appOption = await $('~App');

        //click on selected element
        await appOption.click();

        //assertion usage for value
        const appExpectedEle = await $('~Alarm');
        await expect(appExpectedEle).toBeExisting();

    });


    it('', async ()=> {

        //find element by class locator
        const appTitle = await $('android.view.ViewGroup');

        //print element value
        console.log(await appTitle.getText());

        //assert value availability
        expect(appTitle).toHaveText("API DEmos");

    });
});