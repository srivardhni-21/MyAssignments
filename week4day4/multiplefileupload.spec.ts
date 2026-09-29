import { test, expect } from "@playwright/test";

test("Multiple File Upload", async ({ page }) => {

  // Navigate to LeafGround File Upload page
  await page.goto("https://www.leafground.com/file.xhtml");

  // Locate Advanced Upload file input
  var fileUploadReference = page.locator('input[type="file"]').nth(1);

  // Upload two image files
  await fileUploadReference.setInputFiles([
    "images/image1.jpeg",
    "images/image2.jpeg"
  ]);

  // Verify both files are selected
  await expect(page.getByText("image1.jpeg")).toBeVisible();
  await expect(page.getByText("image2.jpeg")).toBeVisible();
});
