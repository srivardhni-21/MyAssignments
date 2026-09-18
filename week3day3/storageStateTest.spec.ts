import { test, expect } from "@playwright/test";

test.use({
storageState: "loginState.json"
});

test("Open Leaftaps without Login", async ({ page }) => {

// Open Leaftaps directly
await page.goto("http://leaftaps.com/opentaps/control/main");

// Verify Welcome/Home page
await expect(page.getByRole("heading",{name:"Welcome Demo B2B CSR"})).toBeVisible();
});