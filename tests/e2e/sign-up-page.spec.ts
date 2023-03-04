import { test, expect } from '@playwright/test'

test.describe('SignUp Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up')
  })

  test('should start with correct initial state', async ({ page }) => {
    await expect(page.getByLabel(/enter your name/i)).toHaveValue('')
    await expect(page.getByLabel(/enter your e-mail/i)).toHaveValue('')
    await expect(page.getByLabel(/enter your password/i)).toHaveValue('')
    await expect(page.getByLabel(/confirm your password/i)).toHaveValue('')

    await expect(page.getByRole('button', { name: /sign up/i })).toBeDisabled()

    await expect(page.getByTitle(/required field/i)).toHaveCount(4)
  })
})
