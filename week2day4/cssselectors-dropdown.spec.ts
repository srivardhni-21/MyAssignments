import { test } from '@playwright/test';

test('Print Sources dropdown values', async ({ page }) => {

    // 1. Open Leaftaps
    await page.goto('https://leaftaps.com/opentaps/control/main');

    // 2. Login
    await page.locator('#username').fill('democsr');
    await page.locator('#password').fill('crmsfa');
    await page.locator('.decorativeSubmit').click();

    // 3. Click CRM/SFA
    await page.getByText('CRM/SFA').click();

    // 4. Click Create Lead
    await page.getByRole('link',{name:'Create Lead'}).click();

    // 5. Locate Source dropdown
    const sourceDropdown = page.locator('#createLeadForm_dataSourceId');

    // 6. Get all dropdown options
    const options = await sourceDropdown.locator('option').allTextContents();

    // 7. Print the options
    console.log('Sources Dropdown Values:');

    for (var option of options) {
        console.log(option.trim());
    }
});
