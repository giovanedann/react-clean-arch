import { test, expect } from '@playwright/test'
import { mockAccountModel } from 'tests/mocks/domain/models/account'

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
})
