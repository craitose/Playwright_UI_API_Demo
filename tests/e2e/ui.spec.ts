import { test } from "../fixtures/basePage";

import { loginDetails,checkOutDetails } from "../../data";




test("Swag Labs Online Store End to End", async ({ loginPage, productsPage, cartPage }) => {


    await loginPage.login(loginDetails);
    await productsPage.sortProducts();
    await productsPage.addProducts();
    await productsPage.goToCart();

    await cartPage.continueShopping();
    await cartPage.removeItem();
    await cartPage.checkOut(checkOutDetails);
    
    

})

