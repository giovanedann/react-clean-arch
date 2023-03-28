import { render } from '@testing-library/react'
import SurveyResult from 'presentation/pages/SurveyResult'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApiContext } from 'presentation/contexts/api'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import { LoadSurveyResultSpy } from 'tests/mocks/domain/models/load-survey-result'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

export default function createSurveyResultSut(): SutTypes {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()

  render(
    <MemoryRouter initialEntries={['/surveys']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: jest.fn(),
          getCurrentAccount: jest.fn(() => mockAccountModel())
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="surveys"
            element={<SurveyResult loadSurveyResult={loadSurveyResultSpy} />}
          />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { loadSurveyResultSpy }
}
