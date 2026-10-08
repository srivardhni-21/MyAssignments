import { test } from "@playwright/test";
import { CreateAccountPage } from "../pages/createaccountpage";

test("Create Account", async ({ page }) => {

var account = new CreateAccountPage(page);

await account.login();

await account.createAccount();

});