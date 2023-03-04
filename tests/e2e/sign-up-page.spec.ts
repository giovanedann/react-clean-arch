import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
import delay from '../utils/delay'

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

  test('should change the status on valid form data', async ({ page }) => {
    await expect(page.getByTitle(/required field/i)).toHaveCount(4)

    const password = faker.internet.password(6)
    await page.getByLabel(/enter your name/i).focus()
    await page.getByLabel(/enter your name/i).fill(faker.name.firstName())

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page.getByLabel(/enter your password/i).fill(password)

    await page.getByLabel(/confirm your password/i).focus()
    await page.getByLabel(/confirm your password/i).fill(password)

    await expect(page.getByTitle(/required field/i)).toHaveCount(0)

    await expect(page.getByRole('button', { name: /sign up/i })).toBeEnabled()
  })

  test('should keep the submit button disabled on invalid form values', async ({
    page
  }) => {
    await expect(page.getByTitle(/required field/i)).toHaveCount(4)

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

    await page.getByLabel(/confirm your password/i).focus()
    await page
      .getByLabel(/confirm your password/i)
      .fill(faker.random.alphaNumeric(7))

    await expect(page.getByTitle(/passwords not matching/i)).toBeVisible()

    await expect(page.getByRole('button', { name: /sign up/i })).toBeDisabled()
  })

  test('should display the loader after submit', async ({ page }) => {
    await page.route('http://localhost:5050/api/signup', async (route) => {
      const json = {
        accessToken: faker.datatype.uuid()
      }
      route.request()
      await delay(1000)
      await route.fulfill({ json })
    })

    const password = faker.internet.password(6)
    await page.getByLabel(/enter your name/i).focus()
    await page.getByLabel(/enter your name/i).fill(faker.name.firstName())

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page.getByLabel(/enter your password/i).fill(password)

    await page.getByLabel(/confirm your password/i).focus()
    await page.getByLabel(/confirm your password/i).fill(password)

    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page.getByText(/loading\.../i)).toBeVisible()
  })

  test('should display invalid credentials error on 403', async ({ page }) => {
    await page.route('http://localhost:5050/api/signup', async (route) => {
      await route.fulfill({ status: 403 })
    })

    const password = faker.internet.password(6)
    await page.getByLabel(/enter your name/i).focus()
    await page.getByLabel(/enter your name/i).fill(faker.name.firstName())

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page.getByLabel(/enter your password/i).fill(password)

    await page.getByLabel(/confirm your password/i).focus()
    await page.getByLabel(/confirm your password/i).fill(password)

    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page.getByText(/email already in use/i)).toBeVisible()
  })

  test('should display unexpected error on default error cases', async ({
    page
  }) => {
    await page.route('http://localhost:5050/api/signup', async (route) => {
      await route.fulfill({ status: 500 })
    })

    const password = faker.internet.password(6)
    await page.getByLabel(/enter your name/i).focus()
    await page.getByLabel(/enter your name/i).fill(faker.name.firstName())

    await page.getByLabel(/enter your e-mail/i).focus()
    await page.getByLabel(/enter your e-mail/i).fill(faker.internet.email())

    await page.getByLabel(/enter your password/i).focus()
    await page.getByLabel(/enter your password/i).fill(password)

    await page.getByLabel(/confirm your password/i).focus()
    await page.getByLabel(/confirm your password/i).fill(password)

    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(
      page.getByText(/an unexpected error has occurred/i)
    ).toBeVisible()
  })
})
