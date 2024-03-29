import { test, expect } from '@playwright/test'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-client'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import delay from '../utils/delay'

const URL = 'http://localhost:3000/'
const API_URL = 'http://localhost:5050/api/surveys'
const SURVEY_RESULT_API_URL = (id: string): string =>
  `http://localhost:5050/api/surveys/${id}/results`

test.describe('SurveyList page', () => {
  test('should redirect to login on 403', async ({ page }) => {
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

  test('should display the surveys list on success', async ({ page }) => {
    const account = mockAccountModel()
    const surveyList = mockLoadSurveyList()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        json: surveyList
      })
    })

    await page.goto(URL)

    for (const survey of surveyList) {
      await expect(page.getByText(survey.question)).toBeVisible()
    }
  })

  test('should request the survey list again if reload button is clicked', async ({
    page
  }) => {
    const account = mockAccountModel()
    const surveyList = mockLoadSurveyList()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 400
      })
    })

    await page.goto(URL)

    await expect(page.getByRole('button', { name: /reload/i })).toBeVisible()

    await page.unroute(API_URL)

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        json: surveyList
      })
    })

    await page.getByRole('button', { name: /reload/i }).click()

    for (const survey of surveyList) {
      await expect(page.getByText(survey.question)).toBeVisible()
    }
  })

  test('should redirect to survey result page', async ({ page }) => {
    const account = mockAccountModel()
    const [surveyList] = mockLoadSurveyList()

    await page.addInitScript((value) => {
      window.localStorage.setItem('currentAccount', value)
    }, JSON.stringify(account))

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        json: [surveyList]
      })
    })

    await page.route(SURVEY_RESULT_API_URL(surveyList.id), async (route) => {
      await route.fulfill({ status: 200 })
    })

    await page.goto(URL)

    await page.getByText(/see results/i).click()

    await expect(page).toHaveURL(
      `http://localhost:3000/surveys/${surveyList.id}`
    )
  })
})
