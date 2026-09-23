import { test, expect } from "@playwright/test";

test("learn nested frames", async ({ page }) => {

// Open LeafGround frame page
await page.goto("https://www.leafground.com/frame.xhtml");

// Get all frames from the page
var frames = page.frames();

// Find the frame containing the Click button
var innerFrame = frames.find(frame =>
frame.url().includes("framebutton.xhtml")
);

// Make sure the frame is found
expect(innerFrame).toBeDefined();

// Get the Click button
var button = innerFrame!.locator("#Click");

// Get button text before click
var beforeClick = await button.innerText();
console.log("Before Click:", beforeClick);

// Click the button
await button.click();

// Get button text after click
var afterClick = await button.innerText();
console.log("After Click:", afterClick);

// Verify text changed
expect(afterClick).not.toBe(beforeClick);
});
