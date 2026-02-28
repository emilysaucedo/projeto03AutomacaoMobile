export default class productsPage{
    get pageTitle(){
        return $('id:com.androidsample.generalstore:id/toolbar_title');
    }
    get cartItens(){
        return $('id:com.androidsample.generalstore:id/counterText');
    }

    async addToCart(productIndex) {
        const productAddCart = await driver.$(`-android uiautomator:new UiSelector().resourceId("com.androidsample.generalstore:id/productAddCart").instance(${productIndex})`);
        await productAddCart.click();
    }

    async clickCart() {
        const cart = await driver.$("id:com.androidsample.generalstore:id/appbar_btn_cart");
        await cart.click();
    }

}
