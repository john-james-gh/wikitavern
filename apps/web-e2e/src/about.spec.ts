import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
  await page.goto("/about")
})

test("has title", async ({page}) => {
  await expect(page).toHaveTitle(/About | WikiTavern/)
})

test("has h1", async ({page}) => {
  await expect(page.getByRole("heading", {level: 1})).toHaveText("ℹ️ About WikiTavern")
})
