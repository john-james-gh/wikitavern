import {test, expect} from "@playwright/test"

test("has title", async ({page}) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Home | WikiTavern/)
})

test("has h1", async ({page}) => {
  await page.goto("/")
  await expect(page.getByRole("heading", {level: 1})).toHaveText("🏡 Welcome to WikiTavern")
})

test("has three h2", async ({page}) => {
  await page.goto("/")
  await expect(page.getByRole("heading", {level: 2})).toHaveCount(3)
})
