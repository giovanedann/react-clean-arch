import { test, expect } from '@playwright/test'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import delay from '../utils/delay'

const URL = 'http://localhost:3000/'
const API_URL = 'http://localhost:5050/api/surveys'

test.describe('SurveyList page', () => {
  test('should redirect to login', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 403
      })
    })

    await page.goto(URL)

    await expect(page).toHaveURL('http://localhost:3000/login')
  })

  test('should present the right name on header', async ({ page }) => {
    const account = mockAccountModel()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200
      })
    })

    await page.goto(URL)

    await expect(page.getByText(account.name)).toBeVisible()
  })

  test('should load the survey items skeleton while loading surveys', async ({
    page
  }) => {
    const account = mockAccountModel()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      route.request()
      await delay(1000)
      await route.fulfill({
        status: 200
      })
    })

    await page.goto(URL)

    await expect(page.getByTitle(/survey list skeleton/i)).toBeVisible()
  })

  test('should present an error message and a reload button on errors different than 403', async ({
    page
  }) => {
    const account = mockAccountModel()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 400
      })
    })

    await page.goto(URL)

    await expect(
      page.getByText(/an unexpected error has occurred/i)
    ).toBeVisible()

    await expect(page.getByRole('button', { name: /reload/i })).toBeVisible()
  })
})
