import { test } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from "fs";

// Read CSV file
let value: any[] = parse(
fs.readFileSync("Data/sflogin.csv", "utf-8"),
{
columns: true,
skip_empty_lines: true
}
);

// Run test cases one by one
test.describe.serial("Run test in serial mode", () => {

for (let details of value) {

test(
`Learn to read data from CSV file ${details.tcid}`,
async ({ page }) => {

// Launch Salesforce
await page.goto("https://login.salesforce.com/");

// Username
await page.locator("#username").fill(details.username);

// First Login
await page.locator("#Login").click();

// Password
await page.locator("#password").fill(details.password);

// Second Login
await page.locator("#Login").click();

}
);
}

});
