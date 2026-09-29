import { test, expect } from "@playwright/test";

test("Salesforce File Upload", async ({ page }) => {

test.setTimeout(180000);

// LOGIN
await page.goto("https://login.salesforce.com/", {
waitUntil: "domcontentloaded"
});

await page.locator('input[name="username"]').fill(
"ksrivardhni.b21a8abc10c3@agentforce.com"
);

await page.locator('input[name="Login"]').click();

await page.locator('input[type="password"]').fill(
"Vardhnikhan@21"
);

await page.locator('input[name="Login"]').click();

await page.waitForTimeout(8000);

// APP LAUNCHER
await page.getByRole("button", {
name: /App Launcher/i
}).click();

await page.getByText("View All", {
exact: true
}).click();

await page.waitForTimeout(2000);

// SEARCH ACCOUNTS
const searchBox = page.getByPlaceholder(
"Search apps or items..."
);

await expect(searchBox).toBeVisible({
timeout: 30000
});

await searchBox.fill("Accounts");

await page.waitForTimeout(3000);

// OPEN ACCOUNTS
const accounts = page.locator(
'a[title="Accounts"]'
).first();

if (await accounts.count() > 0) {

await accounts.click({
force: true
});

} else {

await page.getByText("Accounts", {
exact: true
}).first().click({
force: true
});
}

await page.waitForTimeout(4000);

// NEW ACCOUNT
const newButton = page.getByRole("button", {
name: "New",
exact: true
});

await expect(newButton).toBeVisible({
timeout: 30000
});

await newButton.click({
force: true
});

await page.waitForTimeout(2000);

// ACCOUNT NAME
const accountName = page.locator(
'input[name="Name"]'
);

await expect(accountName).toBeVisible({
timeout: 30000
});

await accountName.fill(
"Test Banking Account"
);

// RATING
await page.getByRole("combobox", {
name: "Rating",
exact: true
}).click();

await page.getByRole("option", {
name: "Warm",
exact: true
}).click();

// INDUSTRY
await page.getByRole("combobox", {
name: "Industry",
exact: true
}).click();

await page.getByRole("option", {
name: "Banking",
exact: true
}).click();

// OWNERSHIP
await page.getByRole("combobox", {
name: "Ownership",
exact: true
}).click();

await page.getByRole("option", {
name: "Public",
exact: true
}).click();

// SAVE
await page.getByRole("button", {
name: "Save",
exact: true
}).click();

await page.waitForTimeout(4000);

// RELATED
await page.getByText("Related", {
exact: true
}).click();

await page.waitForTimeout(2000);

// UPLOAD FILES
const uploadButton = page.getByRole("button", {
name: "Upload Files",
exact: true
});

await expect(uploadButton).toBeVisible({
timeout: 30000
});

await uploadButton.click({
force: true
});

// FILE INPUT
const fileInput = page.locator(
'input[type="file"]'
).last();

await expect(fileInput).toBeAttached({
timeout: 30000
});

// ACTUAL PDF UPLOAD
await fileInput.setInputFiles(
"files/Coverletter_Srivardhnikumar.pdf"
);

// Wait until PDF appears in upload area
await expect(
page.getByText(
"Coverletter_Srivardhnikumar.pdf",
{ exact: true }
)
).toBeVisible({
timeout: 30000
});

// Find enabled Done button
const doneButton = page
.getByRole("button", {
name: "Done",
exact: true
})
.filter({
visible: true
})
.last();

// Wait for Done to become enabled
await expect(doneButton).toBeEnabled({
timeout: 60000
});

// Finish Salesforce upload
await doneButton.click({
force: true
});

// Wait for upload dialog to disappear
await expect(
page.getByText(
"Coverletter_Srivardhnikumar.pdf",
{ exact: true }
)
).toBeVisible({
timeout: 30000
});

console.log("File uploaded successfully");
});
