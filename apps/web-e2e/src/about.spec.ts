import {expect, test} from "@playwright/test"

test.beforeEach(async ({page}) => {
  await page.goto("/about")
})

test("has title", async ({page}) => {
  await expect(page).toHaveTitle(/About | WikiTavern/)
})

test("has h1", async ({page}) => {
  await expect(page.getByRole("heading", {level: 1})).toHaveText(/ℹ️ About WikiTavern/i)
})

test("homepage h1 looks right", async ({page}) => {
  const headingOne = page.getByRole("heading", {level: 1})
  // take a new screenshot and compare to baseline named "homepage-header.png"
  expect(await headingOne.screenshot()).toMatchSnapshot("headingOne.png")
})
