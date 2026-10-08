import { Page } from "@playwright/test";

export class CreateAccountPage {

    constructor(private page: Page) {}

    async login() {
        await this.page.goto("https://leaftaps.com/opentaps/control/login");
        await this.page.locator("#username").fill("democsr2");
        await this.page.locator("#password").fill("crmsfa");
        await this.page.locator(".decorativeSubmit").click();
    }

    async createAccount() {
        await this.page.getByText("CRM/SFA").click();
        await this.page.getByRole("link", { name: "Accounts" }).click();
        await this.page.getByText("Create Account").click();
    }
}