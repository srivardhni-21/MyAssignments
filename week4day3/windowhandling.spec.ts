import { test } from "@playwright/test";

test("Learn window handling in playwright", async ({ page, context }) => {

// Launch the URL
await page.goto("https://www.leafground.com/window.xhtml");

// Register the event listener and create the promise
let pagePromise = context.waitForEvent("page");

// Click Open - triggering the new page
await page.getByRole("button", { name: "Open",exact:true }).click();

// Resolve the promise and capture the new page
let childPage = await pagePromise;

// Wait for child page to load
await childPage.waitForLoadState("domcontentloaded");

// Print the title of the main page
let pageTitle = await page.title();
console.log("Main Page Title:", pageTitle);

// Print the title of the child page
let childTitle = await childPage.title();
console.log("Child Page Title:", childTitle);

// Enter Email in child page
await childPage.getByLabel("E-mail Address").fill("yourname@gmail.com");

// Enter Message in child page
await childPage.getByLabel("Message").fill("Playwright window handling");

});