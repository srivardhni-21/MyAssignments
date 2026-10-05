import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "utils/data/.env" });

test("MARATHON-1 - Create Lead, Convert to Opportunity and Create Chatter", async ({
page,
}) => {

// =====================================================
// 1. LOGIN TO SALESFORCE
// Username → Login → Password → Login
// =====================================================

await page.goto(process.env.SF_APP_URL!);

// Enter Username
await page.getByLabel("Username").fill(process.env.SF_USERNAME!);

// Click Login
await page.getByRole("button", { name: "Log In" }).click();

// Enter Password
await page.getByLabel("Password").fill(process.env.SF_PASSWORD!);

// Click Login
await page.getByRole("button", { name: "Log In" }).click();

// Wait for Salesforce application
await expect(page.locator("body")).toContainText("Salesforce");


// =====================================================
// 2. OPEN SALES APP
// =====================================================

// App Launcher
await page.getByRole("button", { name: /App Launcher/i }).click();

// View All
await page.getByText("View All", { exact: true }).click();

// Search Sales
const appSearch = page.getByPlaceholder("Search apps or items...");
await appSearch.fill("Sales");

// Open Sales
await page.getByText("Sales", { exact: true }).last().click();


// =====================================================
// 3. OPEN LEADS
// =====================================================

await page.getByText("Leads", { exact: true }).first().click();

// Click New
await page.getByRole("button", { name: "New" }).click();


// =====================================================
// 4. CREATE LEAD
// =====================================================

// Salutation
await page.getByLabel("Salutation").selectOption({ label: "Mr." });

// First Name
await page.getByLabel("First Name").fill("Test");

// Last Name
await page.getByLabel("Last Name").fill("Lead");

// Company
await page.getByLabel("Company").fill("Test Banking Company");

// Lead Status
await page.getByLabel("Lead Status").selectOption({
label: "Open - Not Contacted",
});

// Save Lead
await page.getByRole("button", { name: "Save" }).click();


// =====================================================
// 5. VERIFY LEAD CREATED
// =====================================================

await expect(
page.getByText("Test Lead", { exact: true }).first()
).toBeVisible();


// =====================================================
// 6. CONVERT LEAD
// =====================================================

// More Actions
await page
.getByRole("button", { name: /Show more actions/i })
.click();

// Click Convert
await page.getByText("Convert", { exact: true }).click();


// =====================================================
// 7. CONVERT LEAD INTO OPPORTUNITY
// =====================================================

// Convert button
await page.getByRole("button", { name: "Convert" }).last().click();


// =====================================================
// 8. VERIFY OPPORTUNITY CREATED
// =====================================================

await expect(
page.getByText(/Opportunity/i).first()
).toBeVisible();


// =====================================================
// 9. OPEN CHATTER
// =====================================================

await page.getByText("Chatter", { exact: true }).first().click();


// =====================================================
// 10. CREATE CHATTER POST
// =====================================================

const chatterMessage =
"Lead converted successfully and linked with Contact and Account.";

// Chatter update box
await page
.getByPlaceholder("Share an update...")
.fill(chatterMessage);

// Share
await page.getByRole("button", { name: "Share" }).click();


// =====================================================
// 11. VERIFY CHATTER POST
// =====================================================

await expect(
page.getByText(chatterMessage, { exact: true })
).toBeVisible();


// =====================================================
// 12. VERIFY POST
// =====================================================

console.log(
"MARATHON-1 completed: Lead created → Opportunity created → Chatter posted"
);
});
