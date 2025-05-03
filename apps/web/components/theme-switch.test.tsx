import {render, screen} from "@testing-library/react"
import React from "react"
import {expect, test} from "vitest"
import {ThemeSwitch} from "./theme-switch"

test("has toggle btn", async () => {
  render(<ThemeSwitch />)

  const toggleBtn = screen.getByText(/toggle theme/i)
  expect(toggleBtn).toBeInTheDocument()
})
