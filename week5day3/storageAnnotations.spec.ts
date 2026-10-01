import { test, expect } from "@playwright/test";

// =====================================================
// SALESFORCE TESTS - STORAGE STATE
// =====================================================

test.describe("Salesforce Storage State Tests", () => {

// Reuse the authenticated Salesforce session
test.use({
storageState: "sf-storage.json"
});

// 1. Reuse session and verify Salesforce homepage
test.only("Verify Salesforce homepage", async ({ page }) => {

await page.goto(
"https://orgfarm-47ca5e1bbb-dev-ed.develop.my.salesforce.com/lightning/page/home",
{
waitUntil: "domcontentloaded"
}
);

// Verify that Salesforce login page is NOT displayed
await expect(
page.locator("#username")
).not.toBeVisible({
timeout: 10000
});

console.log("Salesforce homepage verified using storage state");

});


// 2. Navigate to Salesforce page - slow test
test("Navigate to Salesforce page", async ({ page }) => {

test.slow();

await page.goto(
"https://orgfarm-47ca5e1bbb-dev-ed.develop.my.salesforce.com/lightning/page/home",
{
waitUntil: "domcontentloaded"
}
);

await expect(
page.locator("#username")
).not.toBeVisible({
timeout: 10000
});

console.log("Salesforce page navigation completed");

});

});


// =====================================================
// SALESFORCE - INVALID SESSION
// =====================================================

test.describe("Salesforce Invalid Session", () => {

// Empty storage state
test.use({
storageState: {
cookies: [],
origins: []
}
});

// 3. Invalid session - expected failure
test.fail("Invalid Salesforce session", async ({ page }) => {

await page.goto(
"https://orgfarm-47ca5e1bbb-dev-ed.develop.my.salesforce.com/lightning/page/home",
{
waitUntil: "domcontentloaded"
}
);

// This is intentionally expected to fail
// because the session is invalid.
await expect(
page.locator("#username")
).not.toBeVisible({
timeout: 10000
});

});

});


// =====================================================
// LEAFTAPS TESTS
// =====================================================

test.describe("LeafTaps Tests", () => {

// 4. Valid LeafTaps login
test("Login and verify LeafTaps homepage", async ({ page }) => {

await page.goto("http://leaftaps.com/opentaps/");

// Enter username
await page.locator("#username").fill("DemoSalesManager");

// Enter password
await page.locator("#password").fill("crmsfa");

// Click Login
await page.locator("input[type='submit']").click();

// Verify CRM/SFA
await expect(
page.getByRole("link", { name: /CRM\/SFA/i })
).toBeVisible({
timeout: 30000
});

console.log("LeafTaps login successful");

});


// 5. Invalid LeafTaps login - expected failure
test.fail("Invalid LeafTaps login", async ({ page }) => {

await page.goto("http://leaftaps.com/opentaps/");

// Invalid username
await page.locator("#username").fill("InvalidUser");

// Invalid password
await page.locator("#password").fill("WrongPassword");

// Click Login
await page.locator("input[type='submit']").click();

// This is intentionally expected to fail
await expect(
page.getByRole("link", { name: /CRM\/SFA/i })
).toBeVisible({
timeout: 30000
});

});


// 6. Incomplete flow - fixme
test.fixme("Incomplete LeafTaps flow", async ({ page }) => {

await page.goto("http://leaftaps.com/opentaps/");

await page.locator("#username").fill("DemoSalesManager");

console.log("LeafTaps flow is incomplete");

});


// 7. Optional test - skip
test.skip("Optional LeafTaps test", async ({ page }) => {

await page.goto("http://leaftaps.com/opentaps/");

console.log("Optional LeafTaps test skipped");

});

})
