import { test as base } from "@playwright/test";
import { LoginPage } from "../../page_objects/loginPage";
import { ProductsPage } from "../../page_objects/productsPage";
import { CartPage } from "../../page_objects/cartPage";


export const test = base.extend<{
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
}>({
    //Define a fixture
    loginPage: async ({page},use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({page},use) =>{
        await use(new ProductsPage(page));
    },
    cartPage: async ({page},use) =>{
        await use(new CartPage(page));
    }
})