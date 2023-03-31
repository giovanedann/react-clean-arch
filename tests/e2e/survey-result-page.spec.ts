import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
import {
  mockLoadSurveyList,
  mockLoadSurveyResult
} from 'tests/mocks/data/protocols/http'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import { mockSurveyResultModel } from 'tests/mocks/domain/models/survey-result'
import delay from '../utils/delay'
import updateSurveyResultModelMock from '../utils/updateSurveyResultModelMock'

const SURVEY_RESULT_API_URL = (id: string): string =>
  `http://localhost:5050/api/surveys/${id}/results`

const LOAD_SURVEY_LIST_API_URL = 'http://localhost:5050/api/surveys'

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

    test('should redirect to login on 403', async ({ page }) => {
      const surveyId = faker.datatype.uuid()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        await route.fulfill({
          status: 403
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await expect(page).toHaveURL('http://localhost:3000/login')
    })

    test('should back to home on back button click', async ({ page }) => {
      const account = mockAccountModel()

      await page.addInitScript((value) => {
        window.localStorage.setItem('currentAccount', value)
      }, JSON.stringify(account))

      const surveyId = faker.datatype.uuid()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        await route.fulfill({
          status: 200,
          json: mockLoadSurveyResult()
        })
      })

      await page.route(LOAD_SURVEY_LIST_API_URL, async (route) => {
        await route.fulfill({
          status: 200,
          json: mockLoadSurveyList()
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await page.getByRole('button', { name: /back/i }).click()

      await expect(page).toHaveURL('http://localhost:3000/')
    })

    test('should display the survey result', async ({ page }) => {
      const account = mockAccountModel()

      await page.addInitScript((value) => {
        window.localStorage.setItem('currentAccount', value)
      }, JSON.stringify(account))

      const surveyId = faker.datatype.uuid()
      const surveyResult = mockLoadSurveyResult()
      const surveyResultDate = new Date(surveyResult.date)

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        await route.fulfill({
          status: 200,
          json: surveyResult
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await expect(page.getByText(surveyResult.question)).toBeVisible()

      await expect(
        page.getByText(String(surveyResultDate.getDay()), { exact: true })
      ).toBeVisible()

      await expect(
        page.getByText(
          surveyResultDate.toLocaleString('en-US', { month: 'short' }),
          { exact: true }
        )
      ).toBeVisible()

      await expect(
        page.getByText(String(surveyResultDate.getFullYear()), { exact: true })
      ).toBeVisible()

      for (const answer of surveyResult.answers) {
        await expect(page.getByText(answer.answer)).toBeVisible()
        await expect(page.getByText(`${answer.percent}%`)).toBeVisible()
      }
    })
  })

  // Test cases for SaveSurveyResult use case
  test.describe('SaveSurveyResult', () => {
    test.beforeEach(async ({ page }) => {
      const account = mockAccountModel()

      await page.addInitScript((value) => {
        window.localStorage.setItem('currentAccount', value)
      }, JSON.stringify(account))
    })

    test('should present skeleton after unvoted answer click', async ({
      page
    }) => {
      const surveyId = faker.datatype.uuid()
      const result = mockSurveyResultModel()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 200,
          json: result
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await page.unroute(SURVEY_RESULT_API_URL(surveyId))

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await delay(1000)
        await route.fulfill({
          status: 200,
          json: result
        })
      })

      await page.getByText(result.answers[1].answer, { exact: true }).click()

      await expect(page.getByTitle(/survey result skeleton/i)).toBeVisible()
    })

    test('should present an error message and a reload button on errors different than 403', async ({
      page
    }) => {
      const surveyId = faker.datatype.uuid()
      const result = mockSurveyResultModel()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 200,
          json: result
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await page.unroute(SURVEY_RESULT_API_URL(surveyId))

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 500
        })
      })

      await page.getByText(result.answers[1].answer, { exact: true }).click()

      await expect(
        page.getByText(/an unexpected error has occurred/i)
      ).toBeVisible()

      await expect(page.getByRole('button', { name: /reload/i })).toBeVisible()
    })

    test('should redirect to login on 403', async ({ page }) => {
      const surveyId = faker.datatype.uuid()
      const result = mockSurveyResultModel()

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 200,
          json: result
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await page.unroute(SURVEY_RESULT_API_URL(surveyId))

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 403
        })
      })

      await page.getByText(result.answers[1].answer, { exact: true }).click()

      await expect(page.getByText(/login/i)).toBeVisible()
    })

    test('should update the survey result after unvoted answer click', async ({
      page
    }) => {
      const surveyId = faker.datatype.uuid()
      const result = mockSurveyResultModel()
      const updatedResult = updateSurveyResultModelMock(result)

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 200,
          json: result
        })
      })

      await page.goto(SURVEY_RESULT_CLIENT_URL(surveyId))

      await expect(
        page.getByRole('listitem').filter({ hasText: result.answers[0].answer })
      ).toHaveCSS('box-shadow', 'rgb(101, 93, 187) -1px 1px 3px 1px')

      await expect(
        page.getByRole('listitem').filter({ hasText: result.answers[1].answer })
      ).not.toHaveCSS('box-shadow', 'rgb(101, 93, 187) -1px 1px 3px 1px')

      await page.unroute(SURVEY_RESULT_API_URL(surveyId))

      await page.route(SURVEY_RESULT_API_URL(surveyId), async (route) => {
        route.request()
        await route.fulfill({
          status: 200,
          json: updatedResult
        })
      })

      await page.getByText(result.answers[1].answer, { exact: true }).click()

      await expect(
        page.getByRole('listitem').filter({ hasText: result.answers[0].answer })
      ).not.toHaveCSS('box-shadow', 'rgb(101, 93, 187) -1px 1px 3px 1px')

      await expect(
        page.getByRole('listitem').filter({ hasText: result.answers[1].answer })
      ).toHaveCSS('box-shadow', 'rgb(101, 93, 187) -1px 1px 3px 1px')
    })
  })
})
