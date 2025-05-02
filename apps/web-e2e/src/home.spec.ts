import {test, expect, type Page} from "@playwright/test"

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

test.describe("mocks", () => {
  async function setMock(page: Page, data: unknown) {
    await page.request.post("/api/test/mocks", {data})
  }
  async function resetMock(page: Page) {
    await page.request.delete("/api/test/mocks")
  }

  test.describe.configure({mode: "serial"})

  test.afterEach(async ({page}) => {
    await resetMock(page)
  })

  test("has no featured response", async ({page}) => {
    await setMock(page, {featured: []})
    await page.goto("/")
    await expect(page.getByText("No featured wikis yet — check")).toBeVisible()
  })

  test("has featured response", async ({page}) => {
    await setMock(page, {
      featured: [
        {
          _id: "mocked-id",
          title: "Mocked Featured Override",
          slug: {_type: "slug", current: "mocked-slug"},
          updatedAt: new Date().toISOString(),
        },
      ],
    })
    await page.goto("/")
    await expect(page.getByRole("link", {name: "Mocked Featured Override"})).toBeVisible()
  })
})
