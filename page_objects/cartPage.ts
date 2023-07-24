import { expect, Page } from "@playwright/test";
import { ProductsPage } from "./productsPage";
import { checkOutDetails } from "../data";



export class CartPage {
page : Page

constructor(page:Page){
    this.page = page;
}

//Locators

backToProductsButton = () => this.page.locator('[data-test="continue-shopping"]')
checkOutButton = () => this.page.locator('[data-test="checkout"]')
firstNameInput = () => this.page.locator('[data-test="firstName"]')
lastNameInput = () => this.page.locator('[data-test="lastName"]')
zipCodeInput = () => this.page.locator('[data-test="postalCode"]')
continueButton = () => this.page.locator('[data-test="continue"]')
totalLabel = () => this.page.locator('.summary_info_label.summary_total_label')
subTotalLabel = () => this.page.locator('.summary_subtotal_label')
finishButton = () => this.page.locator('[data-test="finish"]')

//Actions

public async continueShopping() {
    await this.backToProductsButton().waitFor()
    await this.backToProductsButton().click()
    this.page.waitForURL('https://www.saucedemo.com/inventory.html')
    const productsPage =  new ProductsPage(this.page)
    await productsPage.backpackAddButton().waitFor()
    await productsPage.backpackAddButton().click()
    await productsPage.goToCart()
    this.page.waitForURL('https://www.saucedemo.com/cart.html')
    

}

public async removeItem() {
    const productsPage =  new ProductsPage(this.page)
    let beforeRemoveCount = await productsPage.getcartCount()
    await productsPage.onsieRemoveButton().waitFor()
    await productsPage.onsieRemoveButton().click()
    let afterRemoveCount = await productsPage.getcartCount()
    await productsPage.shopCartCount().waitFor()
    expect(afterRemoveCount).toBeLessThan(beforeRemoveCount)
}

public async checkOut(checkOutDetails) {
    await this.checkOutButton().waitFor()
    await this.checkOutButton().click()
    this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html')

    await this.firstNameInput().waitFor()
    await this.firstNameInput().fill(checkOutDetails.firstname)
    await this.lastNameInput().waitFor()
    await this.lastNameInput().fill(checkOutDetails.lastname)
    await this.zipCodeInput().waitFor()
    await this.zipCodeInput().fill(checkOutDetails.zipcode)
    await this.continueButton().waitFor()
    await this.continueButton().click()
    this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html')

    const subTotalText = await (await this.subTotalLabel().innerText()).replace("Item total: $","")
    let subTotalValue = parseInt(subTotalText)
    const totalText = await (await this.totalLabel().innerText()).replace("Total: $","")
    const totalvalue = parseInt(totalText)
    expect(totalvalue).toEqual(subTotalValue+Math.ceil(subTotalValue*(8/100)))
    console.warn({totalvalue})
    await this.finishButton().waitFor()
    await this.finishButton().click()
    this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html')
}

}