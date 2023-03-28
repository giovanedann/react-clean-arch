import { render } from '@testing-library/react'
import SurveyResult from 'presentation/pages/SurveyResult'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApiContext } from 'presentation/contexts/api'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import {
  LoadSurveyResultSpy,
  mockSurveyResultModel
} from 'tests/mocks/domain/models/load-survey-result'
import { type LoadSurveyResult } from 'domain/usecases/load-survey-result'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  surveyResultMock: LoadSurveyResult.Model
  saveCurrentAccount: jest.Mock
  surveyId: string
}

export default function createSurveyResultSut(
  loadSurveyResultSpy = new LoadSurveyResultSpy()
): SutTypes {
  const surveyResultMock = mockSurveyResultModel()
  const saveCurrentAccount = jest.fn()
  const surveyId = faker.datatype.uuid()
  loadSurveyResultSpy.surveyResult = surveyResultMock

  render(
    <MemoryRouter initialEntries={[`/surveys/${surveyId}`]}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount,
          getCurrentAccount: jest.fn(() => mockAccountModel())
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route
            path="surveys/:id"
            element={<SurveyResult loadSurveyResult={loadSurveyResultSpy} />}
          />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { loadSurveyResultSpy, surveyResultMock, saveCurrentAccount, surveyId }
}
