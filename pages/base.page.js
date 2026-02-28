export default class BasePage {
    async arrastaParaCima(rolagem) {
        for(let i = 0; i < rolagem; i++) {
            await driver.action('pointer')
                .move({ duration: 0, x: 514, y: 2012 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 507, y: 30 })
                .up({ button: 0 })
                .perform();

            await driver.pause(5000);
        }
    }
}
