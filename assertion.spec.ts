import { test, expect } from "@playwright/test";

test("Classroom 2 - Input Validation", async ({ page }) => {

// Part 1: Navigate to the page
await page.goto("https://leafground.com/input.xhtml");

// Part 2: Validate Disabled Textbox
var disabledTextbox = page.getByPlaceholder("Disabled");
await expect(disabledTextbox).toBeDisabled();

// Part 3: Validate Enabled Textbox
var nameTextbox = page.locator("#j_idt88\\:name");
await expect(nameTextbox).toBeEditable();
await nameTextbox.fill("Srivardhni");

// Part 4: Soft Assertion Practice
await expect.soft(nameTextbox).toBeDisabled();

// Part 5: Fill Data
await nameTextbox.fill("Playwright Learning");
});
