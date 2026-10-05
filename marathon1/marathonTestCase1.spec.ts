import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "utils/data/.env" });

test("Verify Lead Creation and Conversion to Opportunity", async ({ page }) => {

// =====================================================
// 1. Launch Salesforce
// =====================================================

await page.goto("https://login.salesforce.com/");

// =====================================================
// 2. Enter Username
// =====================================================

await page.locator("#username").fill(process.env.SF_USERNAME!);

// Click Login
await page.locator("#Login").click();

// =====================================================
// 3. Wait for Password Screen
// =====================================================

await page.locator("#password").waitFor({
state: "visible",
timeout: 30000
});

// Enter Password
await page.locator("#password").fill(process.env.SF_PASSWORD!);

// Click Login
await page.locator("#Login").click();

// =====================================================
// 4. Complete OTP manually if displayed
// =====================================================

console.log("Complete OTP manually if Salesforce asks for OTP");

// Wait for Salesforce Lightning
await page.waitForURL(/lightning/, {
timeout: 120000
});

console.log("Salesforce login successful");


// =====================================================
// 5. Click App Launcher
// =====================================================

await page.getByRole("button", {
name: /App Launcher/i
}).click();

// =====================================================
// 6. Click View All
// =====================================================

await page.getByText("View All", {
exact: true
}).click();

// =====================================================
// 7. Search Marketing
// =====================================================

const searchBox = page.getByPlaceholder(/Search apps/i);

await searchBox.fill("Marketing");

// Click Marketing
await page.getByText("Marketing", {
exact: true
}).click();

// Wait for Marketing page
await page.waitForTimeout(3000);

console.log("Marketing app opened");


// =====================================================
// 8. Navigate to Leads
// =====================================================

await page.getByRole("link", {
name: "Leads"
}).click();

await page.waitForTimeout(3000);

console.log("Leads page opened");


// =====================================================
// 9. Click New
// =====================================================

await page.getByRole("button", {
name: "New"
}).click();

// Wait for Lead form
await page.waitForTimeout(2000);


// =====================================================
// 10. Fill Mandatory Lead Fields
// =====================================================

// Salutation
await page.getByLabel("Salutation").click();

await page.getByRole("option", {
name: "Mr."
}).click();

// First Name
await page.getByLabel("First Name").fill("Hari");

// Unique Last Name
const leadLastName = "TestLead" + Date.now();

await page.getByLabel("Last Name").fill(leadLastName);

// Company
await page.getByLabel("Company").fill("QEagle");


// =====================================================
// 11. Click Save
// =====================================================

await page.getByRole("button", {
name: "Save"
}).click();

await page.waitForTimeout(3000);

// Verify created Lead
await expect(
page.getByText(leadLastName, {
exact: true
})
).toBeVisible({
timeout: 30000
});

console.log("Lead created successfully");


// =====================================================
// 12. Open Lead Action Dropdown
// =====================================================

await page.getByRole("button", {
name: /Show more actions/i
}).click();

// Click Convert
await page.getByText("Convert", {
exact: true
}).click();

await page.waitForTimeout(2000);


// =====================================================
// 13. Enter Opportunity Name
// =====================================================

const opportunityName =
"Opportunity_" + Date.now();

const opportunityField =
page.getByLabel("Opportunity Name");

await opportunityField.fill(opportunityName);


// =====================================================
// 14. Click Convert
// =====================================================

await page.getByRole("button", {
name: "Convert"
}).click();

await page.waitForTimeout(3000);


// =====================================================
// 15. Verify Conversion Message
// =====================================================

await expect(
page.getByText("Your lead has been converted", {
exact: false
})
).toBeVisible({
timeout: 30000
});

console.log("Lead converted successfully");


// =====================================================
// 16. Click Go to Leads
// =====================================================

await page.getByRole("button", {
name: /Go to Leads/i
}).click();

await page.waitForTimeout(3000);


// =====================================================
// 17. Search Converted Lead
// =====================================================

const leadSearch =
page.getByPlaceholder(/Search this list/i);

await leadSearch.fill(leadLastName);

await page.keyboard.press("Enter");

await page.waitForTimeout(2000);

// Verify lead is no longer displayed
await expect(
page.getByText("No items to display", {
exact: false
})
).toBeVisible({
timeout: 30000
});

console.log("Converted lead is not displayed");


// =====================================================
// 18. Navigate to Opportunities
// =====================================================

await page.getByRole("link", {
name: "Opportunities"
}).click();

await page.waitForTimeout(3000);


// =====================================================
// 19. Search Opportunity
// =====================================================

const opportunitySearch =
page.getByPlaceholder(/Search this list/i);

await opportunitySearch.fill(opportunityName);

await page.keyboard.press("Enter");

await page.waitForTimeout(2000);


// =====================================================
// 20. Verify Opportunity
// =====================================================

await expect(
page.getByText(opportunityName, {
exact: true
})
).toBeVisible({
timeout: 30000
});

// Click created Opportunity
await page.getByText(opportunityName, {
exact: true
}).click();

await page.waitForTimeout(2000);


// Final verification
await expect(
page.getByText(opportunityName, {
exact: true
})
).toBeVisible();

console.log("Opportunity verified successfully");

});
