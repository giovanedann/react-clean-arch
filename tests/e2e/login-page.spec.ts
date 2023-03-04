import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
import delay from '../utils/delay'

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
  })

  test('should start with correct initial state', async ({ page }) => {
    await expect(page.getByLabel(/enter your e-mail/i)).toHaveValue('')
    await expect(page.getByLabel(/enter your password/i)).toHaveValue('')

    await expect(page.getByRole('button', { name: /sign in/i })).toBeDisabled()

    await expect(page.getByTitle(/required field/i)).toHaveCount(2)
  })

  test('should change the status on valid form data', async ({ page }) => {
    await expect(page.getByTitle(/required field/i)).toHaveCount(2)

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await expect(page.getByTitle(/required field/i)).toHaveCount(0)

    await expect(page.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  test('should keep the submit button disabled on invalid form values', async ({
    page
  }) => {
    await expect(page.getByTitle(/required field/i)).toHaveCount(2)

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.random.word())

    await expect(
      page.getByTitle(/value provided to email is invalid/i)
    ).toBeVisible()

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.random.alphaNumeric(4))

    await expect(
      page.getByTitle(
        /value provided to password should have at least 5 characters/i
      )
    ).toBeVisible()

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

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/loading\.../i)).toBeInViewport()
  })

  test('should display invalid credentials error on 401', async ({ page }) => {
    await page.route('http://localhost:5050/api/login', async (route) => {
      await route.fulfill({ status: 401 })
    })

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/invalid credentials/i)).toBeVisible()
  })

  test('should display unexpected error on 403', async ({ page }) => {
    await page.route('http://localhost:5050/api/login', async (route) => {
      await route.fulfill({ status: 403 })
    })

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(
      page.getByText(/an unexpected error has occurred/i)
    ).toBeVisible()
  })

  test('should display unexpected error on default error cases', async ({
    page
  }) => {
    await page.route('http://localhost:5050/api/login', async (route) => {
      await route.fulfill({ status: 500 })
    })

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(
      page.getByText(/an unexpected error has occurred/i)
    ).toBeVisible()
  })

  test('should go to the sign up page if sign up is clicked', async ({
    page
  }) => {
    await page.getByRole('link', { name: /sign up/i }).click()

    await expect(page).toHaveURL('http://localhost:3000/sign-up')
  })

  test('should save the access token on localStorage after submit succeeds', async ({
    page
  }) => {
    const accessToken = faker.datatype.uuid()

    await page.route('http://localhost:5050/api/login', async (route) => {
      const json = {
        accessToken
      }
      await route.fulfill({ status: 200, json })
    })

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page
      .getByLabel(/enter your password/i)
      .fill(faker.internet.password(6))

    await page.getByRole('button', { name: /sign in/i }).click()

    expect(await page.evaluate(() => window.localStorage)).toStrictEqual({
      accessToken
    })
  })
})
