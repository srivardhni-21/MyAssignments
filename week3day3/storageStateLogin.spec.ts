import { test } from "@playwright/test";

test("Login and Save Storage State", async ({ page, context }) => {

// Open Leaftaps
await page.goto("http://leaftaps.com/opentaps/control/main");

// Enter username
await page.locator("#username").fill("democsr");

// Enter password
await page.locator("#password").fill("crmsfa");

// Click Login
await page.locator(".decorativeSubmit").click();

// Save login session
await context.storageState({
path: "loginState.json"
});
});
