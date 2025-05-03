import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
  await page.goto("/")
})

test("has title", async ({page}) => {
  await expect(page).toHaveTitle(/Home | WikiTavern/)
})

test("has h1", async ({page}) => {
  await expect(page.getByRole("heading", {level: 1})).toHaveText("🏡 Welcome to WikiTavern")
})
