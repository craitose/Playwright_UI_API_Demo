import { expect, Page } from "@playwright/test";



export class ProductsPage {
    page: Page

    constructor(page:Page) {
        this.page = page 
    }


    //Locators
    
    menuButton = () => this.page.locator("#react-burger-menu-btn")
    shopCartCount = () => this.page.locator('[class="shopping_cart_badge"]')
    shopCartButton = () => this.page.locator("#shopping_cart_container")
    filterButton = () => this.page.locator('[data-test="product_sort_container"]')
    firstItemPrice = () => this.page.locator('.inventory_item_price')
    onsieAddButton = () => this.page.locator("#add-to-cart-sauce-labs-onesie")
    backpackAddButton = () => this.page.locator("#add-to-cart-sauce-labs-backpack")
    onsieRemoveButton = () => this.page.locator("#remove-sauce-labs-onesie")
    backpackRemoveButton = () => this.page.locator("#remove-sauce-labs-backpack")



    //Actions

    public async addProducts() {
        
        await this.onsieAddButton().waitFor()
        this.onsieAddButton().click()
        let afterAddCount = await this.getcartCount()

        expect(afterAddCount).toBeGreaterThan(0)
    
        
        
    }

    public async getcartCount() {
        await this.shopCartCount().waitFor()
        const text = await this.shopCartCount().innerText()
        console.warn({text})
        return parseInt(text,10)
    
    }

    public async removeProducts() {
        await this.onsieRemoveButton().waitFor()
        this.onsieRemoveButton().click()
    }

    public async sortProducts() {

        await this.filterButton().waitFor()
        this.filterButton().click()
        await this.filterButton().selectOption({"value":"lohi"})
        await this.firstItemPrice().first().waitFor()
        const firstPrice = await this.firstItemPrice().first().innerText()
        console.warn({firstPrice})
        expect(firstPrice).toBe("$7.99")    

    }

    public async goToCart() {
        await this.shopCartButton().waitFor()
        await this.shopCartButton().click()
        this.page.waitForURL('https://www.saucedemo.com/cart.html')
    }




}