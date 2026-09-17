import { test } from "@playwright/test";

test("Create Lead using Playwright Locators", async ({ page }) => {

    // 1. Launch Leaftaps
    await page.goto("http://leaftaps.com/opentaps/control/main");

    // 2. Enter Username
    await page.locator("#username").fill("demosalesmanager");

    // 3. Enter Password
    await page.locator("#password").fill("crmsfa");

    // 4. Click Login
    await page.locator(".decorativeSubmit").click();

    // 5. Click CRM/SFA
    await page.getByText("CRM/SFA").click();

    // 6. Click Leads
    await page.locator('a[href="/crmsfa/control/leadsMain"]').click();

    // 7. Click Create Lead
    await page.locator('a[href="/crmsfa/control/createLeadForm"]').click();

    // 8. Enter Company Name
    await page.locator("#createLeadForm_companyName").fill("Testleaf");

    // 9. Enter First Name
    await page.locator("#createLeadForm_firstName").fill("Srivardhni");

    // 10. Enter Last Name
    await page.locator("#createLeadForm_lastName").fill("Kumar");

    // 11. Enter Phone Number
    await page.locator("#createLeadForm_primaryPhoneNumber").fill("9876543210");

    // 12. Enter Email
    await page.locator("#createLeadForm_primaryEmail").fill("srivardhni@test.com");

    // 13. Click Create Lead
    await page.locator('input[name="submitButton"]').click();

});
