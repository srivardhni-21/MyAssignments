import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "utils/data/.env" });

test("Create and verify a New Case in Chatter", async ({ page }) => {

// =========================
// LOGIN
// =========================

await page.goto(process.env.SF_APP_URL!);

// Username
await page.getByLabel("Username").fill(process.env.SF_USERNAME!);

// Username Login
await page.getByRole("button", { name: "Log In" }).click();

// Password
await page.getByLabel("Password").waitFor();
await page.getByLabel("Password").fill(process.env.SF_PASSWORD!);

// Password Login
await page.getByRole("button", { name: "Log In" }).click();

await page.waitForLoadState("domcontentloaded");


// =========================
// APP LAUNCHER
// =========================

await page.getByRole("button", { name: /App Launcher/i }).click();

// View All
await page.getByText("View All", { exact: true }).click();

// Search Service
const searchApps = page.getByPlaceholder("Search apps or items...");
await searchApps.fill("Service");

// Click Service
await page.getByText("Service", { exact: true }).last().click();

await page.waitForLoadState("domcontentloaded");


// =========================
// CASES
// =========================

// Click Cases
await page.getByText("Cases", { exact: true }).first().click();

// New Case
await page.getByRole("button", { name: "New" }).click();


// =========================
// CREATE CONTACT
// =========================

// Contact Name
await page.getByLabel("Contact Name").click();

// New Contact
await page.getByText("New Contact", { exact: true }).click();

// Salutation
await page.getByLabel("Salutation").selectOption({ label: "Mr." });

// First Name
await page.getByLabel("First Name").fill("Test");

// Last Name
await page.getByLabel("Last Name").fill("Contact");

// Save Contact
await page.getByRole("button", { name: "Save" }).click();

// Verify Contact created
await expect(
page.getByText(/Contact was created/i)
).toBeVisible();


// =========================
// CREATE ACCOUNT
// =========================

// Account Name
await page.getByLabel("Account Name").click();

// New Account
await page.getByText("New Account", { exact: true }).click();

// Account Name
await page.getByLabel("Account Name").fill("Test Banking Account");

// Account Number
await page.getByLabel("Account Number").fill("10001");

// Rating
await page.getByLabel("Rating").selectOption({ label: "Hot" });

// Save Account
await page.getByRole("button", { name: "Save" }).click();

// Verify Account created
await expect(
page.getByText(/Account was created/i)
).toBeVisible();


// =========================
// CASE DETAILS
// =========================

// Status
await page.getByLabel("Status").selectOption({ label: "New" });

// Priority
await page.getByLabel("Priority").selectOption({ label: "High" });

// Case Origin
await page.getByLabel("Case Origin").selectOption({ label: "Email" });

// Subject
await page
.getByLabel("Subject")
.fill("Product Return Request");

// Description
await page
.getByLabel("Description")
.fill(
"Requesting a return for a defective product"
);


// =========================
// SAVE CASE
// =========================

await page.getByRole("button", { name: "Save" }).click();

// Verify Case created
await expect(
page.getByText("Product Return Request", { exact: true })
).toBeVisible();


// =========================
// EDIT STATUS
// =========================

// Click Details
await page.getByText("Details", { exact: true }).click();

// Change Status to Escalated
await page
.getByLabel("Status")
.selectOption({ label: "Escalated" });

// Save
await page.getByRole("button", { name: "Save" }).click();


// =========================
// SHARE AN UPDATE
// =========================

const updateText =
"Product return request has been escalated for further review.";

await page
.getByPlaceholder("Share an update...")
.fill(updateText);

// Share
await page.getByRole("button", { name: "Share" }).click();

// Verify update
await expect(
page.getByText(updateText, { exact: true })
).toBeVisible();


// =========================
// LIKE POST
// =========================

// Post dropdown
await page.getByRole("button", { name: /Show Actions/i }).last().click();

// Like
await page.getByText("Like", { exact: true }).click();

// Verify liked
await expect(
page.getByText(/Post was liked/i)
).toBeVisible();


// =========================
// CHATTER
// =========================

// Click Chatter
await page.getByText("Chatter", { exact: true }).first().click();

await page.waitForLoadState("domcontentloaded");

// Verify post in Chatter
await expect(
page.getByText(updateText, { exact: true })
).toBeVisible();


console.log("Marathon 1 - Create and verify New Case in Chatter completed successfully");

});
