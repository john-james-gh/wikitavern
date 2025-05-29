import {expect, test} from "@playwright/test"

test.beforeEach(async ({page}) => {
  await page.goto("/sign-in")
})

test("has title", async ({page}) => {
  await expect(page).toHaveTitle(/Sign in | WikiTavern/)
})

test("has h1", async ({page}) => {
  await expect(page.getByRole("heading", {level: 1})).toHaveText(/Sign in/i)
})

test.skip("page looks right", async ({page}) => {
  const main = page.locator("main")
  expect(await main.screenshot()).toMatchSnapshot("sign-in.png")
})

test("can sign in", async ({page}) => {
  await page.getByRole("textbox", {name: "you@example.com"}).fill("user@test.com")
  await page.getByRole("textbox", {name: "Your password"}).fill("121212")
  await page.getByRole("button", {name: "Sign in"}).click()
  await expect(page).toHaveURL("/")
  await expect(page.getByRole("heading", {level: 1})).toHaveText(/🏡 Welcome to WikiTavern/i)
})
