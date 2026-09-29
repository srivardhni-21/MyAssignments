import { test, expect } from "@playwright/test";

test("Naukri - Upload Resume", async ({ page }) => {

// Step 1: Open Naukri URL
await page.goto("https://www.naukri.com/registration/createAccount");

// Step 2: Click I'm experienced
await page.getByText("I'm experienced").click();

// Step 3: Upload resume using setInputFiles()
var fileUpload = page.locator('input[type="file"]');

await fileUpload.setInputFiles("Data/Sri_Resume.pdf");

});
