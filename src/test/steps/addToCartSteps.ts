import {When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test"
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

When('user search for a {string}', async function (book) {
    await pageFixture.page.getByLabel("search").fill(book)
    await pageFixture.page.waitForTimeout(2000)
    await pageFixture.page.locator('[role="option"]').click()
});

When('user add the book to the cart', async function () {
    await pageFixture.page.locator("button .mat-button-wrapper").getByText(" Add to Cart").click()
    await pageFixture.page.waitForTimeout(2000)
});

Then('the cart badge should get updated', async function () {
    var cartnumber =await pageFixture.page.locator("#mat-badge-content-0").textContent()
    var productinCart = parseInt(cartnumber ?? "")
    expect(productinCart).toBeGreaterThan(0)
});