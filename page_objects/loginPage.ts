import { expect, Page } from "@playwright/test";
import { loginDetails } from "../data";


export class LoginPage {
    page: Page
    constructor(page: Page) {
        this.page=page;   
    }

    //Locators

    userNameField = () => this.page.locator("#user-name");
    passWordField = () => this.page.locator("#password");
    loginButton = () => this.page.locator("#login-button")


    //Actions
    
    public async login(loginDetails) {

    await this.page.goto("https://www.saucedemo.com/");    
    await this.userNameField().type(loginDetails.username)
    await this.passWordField().type(loginDetails.password)
    await this.loginButton().click()
    this.page.waitForURL("https://www.saucedemo.com/inventory.html")
    }

}