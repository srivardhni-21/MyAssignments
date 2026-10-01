import { test, expect } from "@playwright/test";

test("Salesforce Login and Save Storage State", async ({ browser }) => {

const context = await browser.newContext();
const page = await context.newPage();

// Open Salesforce
await page.goto("https://login.salesforce.com/");

// STEP 1 - Username
await page.locator("#username").fill("ksrivardhni.b21a8abc10c3@agentforce.com");

// Click Login
await page.locator("#Login").click();

// STEP 2 - Wait for Password screen
await page.locator("#password").waitFor({
state: "visible",
timeout: 30000
});

// Enter Password
await page.locator("#password").fill("Vardhnikhan@21");

// Click Login
await page.locator("#Login").click();

console.log("Salesforce login submitted");

// Complete OTP/MFA manually if it appears
console.log("Complete OTP/MFA manually if it appears");

// Wait until Salesforce Home/Lightning loads
await page.waitForURL(/lightning/, {
timeout: 120000
});

console.log("Salesforce Home page loaded");

// Save authenticated session
await context.storageState({
path: "sf-storage.json"
});

console.log("sf-storage.json created successfully");

await context.close();
});
