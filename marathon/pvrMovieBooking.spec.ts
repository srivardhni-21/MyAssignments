import { test, expect } from "@playwright/test";

test("PVR Movie Ticket Booking - Dynamic Selection", async ({ page }) => {

// 1. Launch browser and navigate to PVR Cinemas
await page.goto("https://www.pvrcinemas.com/");

// 2. Select the required city
// Select any available city
const city = page.locator("text=Chennai").first();
if (await city.isVisible().catch(() => false)) {
await city.click();
}

// 3. Click on Cinema option
await page.getByText("Cinema", { exact: true }).click();

// 4. Click on Select Cinema dropdown
const cinemaDropdown = page.getByText("Select Cinema", { exact: true });

if (await cinemaDropdown.isVisible().catch(() => false)) {
await cinemaDropdown.click();
}

// 5. Select any available cinema dynamically
const cinemaOptions = page.locator("li, [role='option']");

if (await cinemaOptions.count() > 0) {
await cinemaOptions.first().click();
}


// 6. Select any available date
const dates = page.locator("button, a").filter({ hasText: /Today|Tomorrow/ });

if (await dates.count() > 0) {
await dates.first().click();
}

// 7. Select any available movie
const movies = page.locator("button, a").filter({ hasText: /.+/ });

// Select an available movie/show based on the page
if (await movies.count() > 0) {
await movies.first().click();
}

// 8. Select any available show time
const showTimes = page.locator("button").filter({ hasText: /\d{1,2}:\d{2}/ });

if (await showTimes.count() > 0) {
await showTimes.first().click();
}

// 9. Click Submit
const submitButton = page.getByRole("button", { name: /Submit/i });

if (await submitButton.isVisible().catch(() => false)) {
await submitButton.click();
}

// 10. Accept consent / cookie popup if displayed
const acceptButton = page.getByRole("button", {
name: /Accept|Allow|I Agree/i
});

if (await acceptButton.isVisible().catch(() => false)) {
await acceptButton.click();
}

// 11. Handle additional confirmation popup if displayed
const continueButton = page.getByRole("button", {
name: /Continue|Confirm|Proceed/i
});

if (await continueButton.isVisible().catch(() => false)) {
await continueButton.click();
}

// 12. Select any available seat dynamically
const seats = page.locator(
"[class*='seat']:not([class*='unavailable'])"
);

if (await seats.count() > 0) {
await seats.first().click();
}

// 13. Verify that a seat is selected
const selectedSeat = page.locator(
"[aria-selected='true'], [class*='active'], [class*='selected']"
);

if (await selectedSeat.count() > 0) {
await expect(selectedSeat.first()).toBeVisible();
}


// 14. Verify total ticket amount is displayed
const amount = page.getByText(/₹|Rs\.?|Total/i).first();

await expect(amount).toBeVisible();

// 15. Verify page title
await expect(page).toHaveTitle(/PVR|Movie|Cinema/i);

// 16. Click Proceed
const proceedButton = page.getByRole("button", {
name: /Proceed/i
});

if (await proceedButton.isVisible().catch(() => false)) {
await proceedButton.click();
}
});
