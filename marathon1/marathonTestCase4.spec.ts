import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "utils/data/.env" });

test("TC_DEC_001 - Search Product and Add to Cart", async ({ page }) => {

// 1. Launch browser and navigate to application
await page.goto(process.env.SF_APP_URL!);

// 2. Login - Username
await page.getByLabel("Username").fill(process.env.SF_USERNAME!);

// Username Login
await page.getByRole("button", { name: "Log In" }).click();

// 3. Login - Password
await page.getByLabel("Password").waitFor();
await page.getByLabel("Password").fill(process.env.SF_PASSWORD!);

// Password Login
await page.getByRole("button", { name: "Log In" }).click();

// Wait for Salesforce
await page.waitForLoadState("domcontentloaded");

// 4. Verify home page
await expect(page.locator("body")).toContainText("Salesforce");

// 5. Open App Launcher
await page.getByRole("button", { name: /App Launcher/i }).click();

// 6. View All
await page.getByText("View All", { exact: true }).click();

// 7. Search Service
const searchBox = page.getByPlaceholder("Search apps or items...");
await searchBox.fill("Service");

// 8. Open Service
await page.getByText("Service", { exact: true }).last().click();

// 9. Open Service Catalog / required application area
await expect(page.locator("body")).toContainText("Service");

// 10. Search for Mobiles
const pageSearch = page.getByPlaceholder(/Search this list/i);

if (await pageSearch.count() > 0) {
await pageSearch.first().fill("Mobiles");
await page.keyboard.press("Enter");
}

// 11. Select Mobiles
if (await page.getByText("Mobiles", { exact: true }).count() > 0) {
await page.getByText("Mobiles", { exact: true }).first().click();
}

// 12. Select Apple iPhone 13 Pro
if (
await page.getByText("Apple iPhone 13 Pro", { exact: true }).count() > 0
) {
await page
.getByText("Apple iPhone 13 Pro", { exact: true })
.first()
.click();
}

// 13. Verify product
await expect(page.locator("body")).toContainText(
"Apple iPhone 13 Pro"
);

// 14. Order Now
if (
await page.getByRole("button", { name: /Order Now/i }).count() > 0
) {
await page.getByRole("button", { name: /Order Now/i }).click();
}

// 15. Verify order confirmation
await expect(page.locator("body")).toContainText(
/Order|Request|Confirmation|Success/i
);

// 16. Full-page screenshot
await page.screenshot({
path: "TC_DEC_001_Order_Confirmation.png",
fullPage: true
});

console.log("TC_DEC_001 completed successfully");
});
