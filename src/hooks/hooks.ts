import { Before, After, BeforeAll, AfterAll, Status, AfterStep } from "@cucumber/cucumber"
import { Browser, BrowserContext } from "@playwright/test"
import { pageFixture } from "./pageFixture"
import { invokeBrowser } from "../helper/browsers/browserManager"


var browser: Browser
var context: BrowserContext

BeforeAll(async function () {
    browser = await invokeBrowser()
})

Before(async function () {
    context = await browser.newContext()
    const page = await context.newPage()
    pageFixture.page = page
})

// AfterStep(async function ({pickle}) {
//     //Screenshot
//     const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
//     await this.attach(img, "image/png")
// })

After(async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
        // Take Screenshot
        const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        await this.attach(img, "image/png")
    }
    await pageFixture.page.close()
    await context.close()
})

AfterAll(async function () {
    await browser.close()
})
