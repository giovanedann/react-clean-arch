import { test, expect } from '@playwright/test'

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
})
