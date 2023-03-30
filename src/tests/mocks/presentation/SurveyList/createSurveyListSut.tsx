import { render } from '@testing-library/react'
import { type LoadSurveyList } from 'domain/usecases'
import { ApiContext } from 'presentation/contexts/api'
import SurveyList from 'presentation/pages/SurveyList'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-client'
import { mockAccountModel } from 'tests/mocks/domain/models/account'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  saveCurrentAccount: jest.Mock
}

export class LoadSurveyListSpy implements LoadSurveyList {
  calls: number = 0
  surveys: LoadSurveyList.Model[] = mockLoadSurveyList()

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.calls += 1
    return this.surveys
  }
}

export default function createSurveyListSut(
  loadSurveyListSpy = new LoadSurveyListSpy()
): SutTypes {
  const saveCurrentAccount = jest.fn()

  render(
    <MemoryRouter initialEntries={['/']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount,
          getCurrentAccount: jest.fn(() => mockAccountModel())
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<SurveyList loadSurveyList={loadSurveyListSpy} />}
          />
          <Route path="login" element={<h1>Login</h1>} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { loadSurveyListSpy, saveCurrentAccount }
}
