import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';

import BasicInfoPage from '../../pages/basicInfo.page.js';
import ProductsPage  from '../../pages/products.page.js';
import CartPage      from '../../pages/cart.page.js';
import BasePage      from '../../pages/base.page.js';

const basicInfoPage = new BasicInfoPage();
const productsPage  = new ProductsPage();
const cartPage      = new CartPage();
const basePage      = new BasePage();

Given('o aplicativo General Store está aberto', async () => {
    await basicInfoPage.appName.waitForDisplayed({ timeout: 10000 });
});

Given(
    'preencho o formulário inicial com nome {string}, país {string} e gênero {string}',
    async (nome, pais, genero) => {
        await basicInfoPage.selectCountry(pais);
        await basicInfoPage.fillName(nome);
        await basicInfoPage.selectGender(genero);
    }
);

Given('avanco para a lista de produtos', async () => {
    await basicInfoPage.clickLetsShop();
    await driver.pause(1500);
});

When('estou na lista de produtos', async () => {
    await productsPage.pageTitle.waitForDisplayed({ timeout: 8000 });
    const titulo = await productsPage.pageTitle.getText();
    expect(titulo).toEqual('Products');
    await basePage.arrastaParaCima(1);
});

Then('o primeiro produto {string} deve estar visivel na lista', async (nomeProduto) => {
    await expect(driver.$(`-android uiautomator:new UiSelector().text("${nomeProduto}")`)).toBeDisplayed();
});

Then('o preço dele deve ser {string} na lista', async (preco) => {
    await expect(driver.$(`-android uiautomator:new UiSelector().text("${preco}")`)).toBeDisplayed();
});

When('adiciono o produto {string} ao carrinho', async (_nomeProduto) => {
    await productsPage.addToCart(0);
    await driver.pause(800);
});

Then('o total do carrinho deve ser {string}', async (totalCarrinho) => {
    await productsPage.cartItens.waitForDisplayed({ timeout: 5000 });
    expect(await productsPage.cartItens.getText()).toEqual(totalCarrinho);
});

When('avanco na lista de produtos', async () => {
    await basePage.arrastaParaCima(1);
    await driver.pause(1500);
});

Then('o segundo produto {string} deve estar visivel na lista', async (nomeProduto2) => {
    await expect(driver.$(`-android uiautomator:new UiSelector().text("${nomeProduto2}")`)).toBeDisplayed();
});

Then('o preco dele deve ser {string} na lista tambem', async (preco2) => {
    await expect(driver.$(`-android uiautomator:new UiSelector().text("${preco2}")`)).toBeDisplayed();
});

When('adiciono o segundo produto {string} ao carrinho', async (_nomeProduto2) => {
    await productsPage.addToCart(0);
    await driver.pause(800);
});

Then('o total do carrinho deve ser atualizado para {string}', async (totalCarrinho2) => {
    await expect(productsPage.cartItens).toBeDisplayed();
    await expect(productsPage.cartItens).toHaveText(totalCarrinho2);
});

When('avanço para o carrinho', async () => {
    await productsPage.clickCart();
    await driver.pause(1500);
});
Then(
    'deve aparecer o produto {string} com o preco {string} no carrinho',
    async (nomeProduto, preco) => {
        const productName = await driver.$(`-android uiautomator:new UiSelector().resourceId("com.androidsample.generalstore:id/productName").text("${nomeProduto}")`);
        await productName.waitForDisplayed({ timeout: 8000 });
        expect(await productName.getText()).toEqual(nomeProduto);

        const productPrice = await driver.$(`-android uiautomator:new UiSelector().resourceId("com.androidsample.generalstore:id/productPrice").text("${preco}")`);
        await productPrice.waitForDisplayed({ timeout: 8000 });
        expect(await productPrice.getText()).toEqual(preco);
    }
);


Then(
    'deve aparecer o outro produto {string} com o preco {string} no carrinho',
    async (nomeProduto2, preco2) => {
        const productName2 = await driver.$(`-android uiautomator:new UiSelector().resourceId("com.androidsample.generalstore:id/productName").text("${nomeProduto2}")`);
        await productName2.waitForDisplayed({ timeout: 8000 });
        expect(await productName2.getText()).toEqual(nomeProduto2);

        const productPrice2 = await driver.$(`-android uiautomator:new UiSelector().resourceId("com.androidsample.generalstore:id/productPrice").text("${preco2}")`);
        await productPrice2.waitForDisplayed({ timeout: 8000 });
        expect(await productPrice2.getText()).toEqual(preco2);
    }
);

Then('o valor total do carrinho deve ser {string}', async (totalCompra) => {
    await expect(cartPage.totalAmount).toBeDisplayed();
    await expect(cartPage.totalAmount).toHaveText(totalCompra);
});