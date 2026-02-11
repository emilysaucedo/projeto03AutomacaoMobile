import { remote } from 'webdriverio';

async function main() {
    const caps = {
        "platformName": "Android",
        "appium:platformVersion": "13.0",
        "appium:deviceName": "emulator5554",
        "appium:deviceOrientation": "portrait",
        "appium:appPackage": "com.decathlon.app",
        "appium:appActivity": "com.decathlon.app.activities.main.ShoppingAppActivity",
        "appium:automationName": "UiAutomator2",
        "browserName": "",
        "appium:noReset": true,
        "appium:ensureWebviewsHavePages": "true",
        "appium:connectHardwareKeyboard": true,
        "unhandledPromptBehavior": "ignore",
        "wdio:enforceWebDriverClassic": true
    }
    const driver = await remote(
        {
            protocol: 'http',
            hostname: 'localhost',
            port: 4723,
            path: "/",
            capabilities: caps
        }
    );

    // Dar tempo ao app carregar; espera implícita para todos os elementos
    await driver.setTimeout({ implicit: 15000 });

// Seção Explorar – esperar a tela inicial carregar
const exploreSection = await driver.$("-android uiautomator:new UiSelector().text(\"Explorar\")");
await exploreSection.waitForDisplayed({ timeout: 15000 });
await exploreSection.click();
//Seção Desportos de montanha
const mountainSportsSection = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.View\").instance(25)");
await mountainSportsSection.click();
//Seção Campismo
const campingSection = await driver.$("-android uiautomator:new UiSelector().text(\"Campismo\")");
await campingSection.click();
const viewAllSection = await driver.$("-android uiautomator:new UiSelector().text(\"Ver tudo\")");
await viewAllSection.click();
//Escolher o produto
const productName = await driver.$("-android uiautomator:new UiSelector().text(\"Fogareiro de campismo a gás 1 bico Campingaz camp' bistro plus\")");
await productName.click();
//Validar o nome do produto
await productName.waitForDisplayed({ timeout: 15000 });
//Validar o preço do produto
const productPrice = await driver.$("-android uiautomator:new UiSelector().text(\"29,90€\")");
await productPrice.waitForDisplayed({ timeout: 15000 });
//Clicar no botão de adicionar ao carrinho
await driver.action('pointer')
  .move({ duration: 0, x: 504, y: 1689 })
  .down({ button: 0 })
  .move({ duration: 1000, x: 497, y: 1300 })
  .up({ button: 0 })
  .perform();

const addToCartButton = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.Button\").instance(2)");
await addToCartButton.click();
//Fechar o explorar
const closeExploreSection = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.Button\").instance(0)");
await closeExploreSection.click();
//Ir para o carrinho
const cartSection = await driver.$("-android uiautomator:new UiSelector().text(\"Carrinho\")");
await cartSection.click();
//Validar o nome do produto no carrinho
const carTitle = await driver.$("-android uiautomator:new UiSelector().text(\"O meu carrinho\")");
await carTitle.waitForDisplayed({ timeout: 15000 });
//Validar o preço do produto no carrinho
const cartProductName = await driver.$("-android uiautomator:new UiSelector().text(\"CAMPINGAZ Fogareiro de campismo a gás 1 bico Campingaz camp' bistro plus\")");
await cartProductName.waitForDisplayed({ timeout: 15000 });
const cartProductPrice = await driver.$("-android uiautomator:new UiSelector().text(\"29,90€/unit\")");
await cartProductPrice.waitForDisplayed({ timeout: 15000 });
}
main().catch(console.log);
