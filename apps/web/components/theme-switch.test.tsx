import {cleanup, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import {afterEach, expect, test, vi} from "vitest"
import {ThemeSwitch} from "./theme-switch"
import {ThemeProvider} from "next-themes"

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: "light",
  }),
  ThemeProvider: ({children}: {children: React.ReactNode}) => <>{children}</>,
}))

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>,
  )
}

afterEach(() => {
  cleanup() // unmounts React trees and clears the DOM
})

test("renders theme toggle button with correct accessibility label", () => {
  renderWithTheme(<ThemeSwitch />)
  const toggleBtn = screen.getByRole("button", {name: /toggle theme/i})
  expect(toggleBtn).toBeInTheDocument()
})

test("displays all theme options when clicked", async () => {
  const user = userEvent.setup()
  renderWithTheme(<ThemeSwitch />)

  // Click the toggle button to open dropdown
  const toggleBtn = screen.getByRole("button", {name: /toggle theme/i})
  await user.click(toggleBtn)

  // Check if all theme options are present
  expect(screen.getByText("Light")).toBeInTheDocument()
  expect(screen.getByText("Dark")).toBeInTheDocument()
  expect(screen.getByText("System")).toBeInTheDocument()
})

test("displays correct emojis for each theme option", async () => {
  const user = userEvent.setup()
  renderWithTheme(<ThemeSwitch />)

  // Click the toggle button to open dropdown
  const toggleBtn = screen.getByRole("button", {name: /toggle theme/i})
  await user.click(toggleBtn)

  // Get all dropdown menu items
  const menuItems = screen.getAllByRole("menuitem")

  // Check if each menu item has the correct emoji
  expect(menuItems[0]).toHaveTextContent("☀️")
  expect(menuItems[1]).toHaveTextContent("🌙")
  expect(menuItems[2]).toHaveTextContent("🖥️")
})
