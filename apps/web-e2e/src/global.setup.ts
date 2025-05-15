import {FullConfig} from "@playwright/test"
import {chromium} from "@playwright/test"

async function globalSetup(config: FullConfig) {
  console.log("Running global setup...")

  const baseURL = "http://127.0.0.1:3000"

  // Run each auth setup file
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // Run admin auth
  await page.goto(`${baseURL}/sign-in`)
  await page.getByRole("textbox", {name: "you@example.com"}).fill("admin@test.com")
  await page.getByRole("textbox", {name: "Your password"}).fill("121212")
  await page.getByRole("button", {name: "Sign in"}).click()
  await page.waitForURL(`${baseURL}/`)
  await page.context().storageState({path: "./.auth/admin.json"})

  // Run moderator auth
  await page.goto(`${baseURL}/sign-in`)
  await page.getByRole("textbox", {name: "you@example.com"}).fill("moderator@test.com")
  await page.getByRole("textbox", {name: "Your password"}).fill("121212")
  await page.getByRole("button", {name: "Sign in"}).click()
  await page.waitForURL(`${baseURL}/`)
  await page.context().storageState({path: "./.auth/moderator.json"})

  // Run user auth
  await page.goto(`${baseURL}/sign-in`)
  await page.getByRole("textbox", {name: "you@example.com"}).fill("user@test.com")
  await page.getByRole("textbox", {name: "Your password"}).fill("121212")
  await page.getByRole("button", {name: "Sign in"}).click()
  await page.waitForURL(`${baseURL}/`)
  await page.context().storageState({path: "./.auth/user.json"})

  await browser.close()
}

export default globalSetup
