import { test, expect } from '@playwright/test';

test('Salesforce Login', async ({ page }) => {

// 1. Navigate to Salesforce login page
await page.goto('https://login.salesforce.com/?locale=in');

// 2. Locate username using ID selector
const username = page.locator('#username');

// 3. Enter username
await username.fill('dilipkumar.rajendran@testleaf.com');

// 4. Locate Submit button using Attribute selector
const submitButton = page.locator('input[type="submit"]');

// 5. Click Submit
await submitButton.click();

// 6. Wait for password page to load
await page.waitForTimeout(2000);

// 7. Locate password using Attribute selector
const password = page.locator('input[type="password"]');

// 8. Enter password
await password.fill('TestLeaf@2025');

// 9. Locate Login button
const loginButton = page.locator('input[type="submit"]');

// 10. Click Login
await loginButton.click();

// 11. Verify successful login
await expect(page).toHaveURL(/salesforce/);

});
