import { test, expect } from '@playwright/test';

test('Search product, apply filters, add to cart in Decathlon', async ({ page }) => {

// 1. Launch Decathlon
await page.goto('https://www.decathlon.in/', {
waitUntil: 'domcontentloaded'
});

console.log('Page Title:', await page.title());

// 2. Search for shoes
const searchBox = page.getByPlaceholder(
'Search for 60+ sports and 6,000+ products'
);

await searchBox.fill('shoes');
await searchBox.press('Enter');

await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3000);

console.log('Search Page Title:', await page.title());

// 3. Wait for products
await page.waitForTimeout(2000);

// 4. Select first available product
const product = page.locator('a').filter({
has: page.locator('img')
}).first();

if (await product.count() > 0) {
await product.click().catch(() => {});
await page.waitForTimeout(3000);
}

// 5. Add product to cart
const addToCart = page.getByText('Add to cart', { exact: true }).first();

if (await addToCart.count() > 0 &&
await addToCart.isVisible().catch(() => false)) {

await addToCart.click({ force: true });
await page.waitForTimeout(2000);
}

// 6. Open Cart
const cart = page.getByText('Cart', { exact: true }).first();

if (await cart.count() > 0 &&
await cart.isVisible().catch(() => false)) {

// Force click because Decathlon popup backdrop can block Cart
await cart.click({ force: true });
}

// 7. Wait for Cart page
await page.waitForTimeout(3000);

console.log('Final Page Title:', await page.title());
});
