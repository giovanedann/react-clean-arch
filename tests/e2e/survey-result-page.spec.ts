import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import delay from '../utils/delay'

const SURVEY_RESULT_API_URL = (id: string): string =>
  `http://localhost:5050/api/surveys/${id}/results`
const SURVEY_RESULT_CLIENT_URL = (id: string): string =>
  `http://localhost:3000/surveys/${id}`

test.describe('SurveyResult page', () => {
  // Test cases for LoadSurveyResult use case
  test.describe('LoadSurveyResult', () => {
    test.beforeEach(async ({ page }) => {
      const account = mockAccountModel()

      await page.addInitScript((value) => {
        window.localStorage.setItem('currentAccount', value)
      }, JSON.stringify(account))
    })

    test('should show the skeleton while loading', async ({ page }) => {
      const surveyId = faker.datatype.uuid()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await delay(1000)
        await route.fulfill({
          status: 200
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await expect(page.getByTitle(/survey result skeleton/i)).toBeVisible()
    })

    test('should present an error message and a reload button on errors different than 403', async ({
      page
    }) => {
      const surveyId = faker.datatype.uuid()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        await route.fulfill({
          status: 400
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await expect(
        page.getByText(/an unexpected error has occurred/i)
      ).toBeVisible()

      await expect(page.getByRole('button', { name: /reload/i })).toBeVisible()
    })
  })
})
