import { test, expect } from "@playwright/test";

test("Login to Leaftaps using Playwright locators", async ({ page }) => {

  // Navigate to the Leaftaps application
  await page.goto("https://leaftaps.com/opentaps/control/main");

  // Enter the username
  await page.locator("#username").fill("democsr2");

  // Enter the password
  await page.locator("#password").fill("crmsfa");

  // Click the Login button
  await page.getByRole("button", { name: "Login" }).click();

});
