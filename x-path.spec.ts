import { test } from '@playwright/test';

test('Salesforce Login using XPath', async ({ page }) => {

// Launch Salesforce application
await page.goto('https://login.salesforce.com/?locale=in');

// Enter Username
await page.locator('//input[@id="username"]')
.fill('dilipkumar.rajendran@testleaf.com');

// Click Login button
await page.locator('//input[@value="Log In"]').click();

// Enter Password
await page.locator('//input[@type="password"]')
.fill('TestLeaf@2025');

// Click Login button
await page.locator('//input[@value="Log In"]').click();

});
