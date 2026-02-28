export default class basicInfoPage{
    get appName(){
        //return new UiSelector().resourceId("com.androidsample.generalstore:id/toolbar_title");
        return $('id:com.androidsample.generalstore:id/toolbar_title');
        //new UiSelector().resourceId("com.androidsample.generalstore:id/toolbar_title")
        //await driver.$("id:com.androidsample.generalstore:id/toolbar_title");
    }

    async selectCountry(country) {
        const spinnerCountry = await driver.$("id:com.androidsample.generalstore:id/spinnerCountry");
        await spinnerCountry.click();
        await driver.pause(1500);

        await driver.action('pointer')
        .move({ duration: 0, x: 407, y: 1848 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 438, y: 847 })
        .up({ button: 0 })
        .perform();

        await driver.action('pointer')
        .move({ duration: 0, x: 382, y: 1934 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 405, y: 840 })
        .up({ button: 0 })
        .perform();

        await driver.action('pointer')
        .move({ duration: 0, x: 410, y: 1898 })
        .down({ button: 0 })
        .move({ duration: 1000, x: 433, y: 800 })
        .up({ button: 0 })
        .perform();

        await driver.pause(1500);
        const countryOption = await driver.$(`-android uiautomator:new UiSelector().text("${country}")`);
        await countryOption.click();
    }

    async fillName(name) {
        const nameField = await driver.$("id:com.androidsample.generalstore:id/nameField");
        await nameField.setValue(name);
    }

    async selectGender(gender) {
        if (gender === 'female') {
        const radioFemale = await driver.$("id:com.androidsample.generalstore:id/radioFemale");
            await radioFemale.click();
        } else {
            const radioMale = await driver.$("id:com.androidsample.generalstore:id/radioMale");
            await radioMale.click();
        }
    }

    async clickLetsShop() {
        const letsShopButton = await driver.$("id:com.androidsample.generalstore:id/btnLetsShop");
        await letsShopButton.click();
    }
}
