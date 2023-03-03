import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

async function delay(ms: number): Promise<void> {
  const waiter = new Promise((resolve) => {
    setTimeout(function () {
      resolve('true')
    }, ms)
  })
  await waiter
}

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
  })

  test('should start with correct initial state', async ({ page }) => {
    await expect(page.getByPlaceholder(/enter your e-mail/i)).toHaveValue('')
    await expect(page.getByPlaceholder(/enter your password/i)).toHaveValue('')

    await expect(page.getByRole('button', { name: /sign in/i })).toBeDisabled()

    await expect(page.getByText(/🔴/i)).toHaveCount(2)
  })

  test('should change the status on valid email start with correct initial state', async ({
    page
  }) => {
    await expect(page.getByText(/🔴/i)).toHaveCount(2)

    await page
      .getByPlaceholder(/enter your e-mail/i)
      .fill(faker.internet.email())

    await page
      .getByPlaceholder(/enter your password/i)
      .fill(faker.internet.password(6))

    await expect(page.getByText(/🟢/i)).toHaveCount(2)
    await expect(page.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  test('should disable the submit button on invalid form values', async ({
    page
  }) => {
    await expect(page.getByText(/🔴/i)).toHaveCount(2)

    await page.getByPlaceholder(/enter your e-mail/i).fill(faker.random.word())

    await page
      .getByPlaceholder(/enter your password/i)
      .fill(faker.random.alphaNumeric(4))

    await expect(page.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  test('should display the loader after submit', async ({ page }) => {
    await page.route('http://localhost:5050/api/login', async (route) => {
      const json = {
        accessToken: faker.datatype.uuid()
      }
      route.request()
      await delay(1000)
      await route.fulfill({ json })
    })

    await page
      .getByPlaceholder(/enter your e-mail/i)
      .fill(faker.internet.email())

    await page
      .getByPlaceholder(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/loading\.../i)).toBeInViewport()
  })
})