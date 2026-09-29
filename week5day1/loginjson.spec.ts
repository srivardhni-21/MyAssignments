import { test } from "@playwright/test"

import data from "../../Data/login.json"

test.describe.serial('Salesforce Login', async () => {

for (let credentials of data) {

test(`Salesforce Login ${credentials.tcid}`, async ({ page }) => {

await page.goto("https://login.salesforce.com")

await page.locator('#username').fill(credentials.username)

await page.getByRole('button', { name: 'Log In' }).click()

await page.locator('#password').fill(credentials.password)

await page.getByRole('button', { name: 'Log In' }).click()

})

}
})



