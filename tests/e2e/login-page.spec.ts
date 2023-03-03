import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should start with correct initial state', async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    await expect(page.getByPlaceholder(/enter your e-mail/i)).toHaveValue('')
    await expect(page.getByPlaceholder(/enter your password/i)).toHaveValue('')

    await expect(page.getByRole('button', { name: /sign in/i })).toBeDisabled()

    await expect(page.getByText(/🔴/i)).toHaveCount(2)
  })
})
