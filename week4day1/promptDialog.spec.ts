import { test } from "@playwright/test";

test("Automate JavaScript Prompt Dialog", async ({ page }) => {

await page.goto("https://www.leafground.com/alert.xhtml");

// Handle JavaScript prompt dialog
page.on("dialog", async (dialog) => {
console.log(dialog.message());
await dialog.accept("Playwright");
});

// Click the Show button under Prompt Dialog
await page.getByRole("button", { name: "Show" }).nth(1).click();

});