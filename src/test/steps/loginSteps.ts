import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test"
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
  await pageFixture.page.goto("https://bookcart.azurewebsites.net/")
})

Given('User click on the login link', async function () {
  await pageFixture.page.locator('.mat-button-wrapper ').getByText("Login").click()
});

Given('User enter the username as {string}', async function (username) {
  await pageFixture.page.locator('[data-placeholder="Username"]').fill(username)
});

Given('User enter the password as {string}', async function (password) {
  await pageFixture.page.locator('[data-placeholder="Password"]').fill(password)
});

When('User click on the login button', async function () {
  await pageFixture.page.locator('[color="primary"]').getByText("Login").nth(1).click()
  await pageFixture.page.waitForTimeout(2000)
});

Then('Login should be success', async function () {
  await expect(pageFixture.page.getByText("Price Filter")).toBeVisible()
  await expect(pageFixture.page.getByText("Login")).not.toBeVisible()
});

Then('Login should fail', async function () {
  const failureMesssage = pageFixture.page.locator("mat-error[role='alert']");
  await expect(failureMesssage).toBeVisible();
});