import { render } from '@testing-library/react'
import { type LoadSurveyList } from 'domain/usecases'
import { ApiContext } from 'presentation/contexts/api'
import SurveyList from 'presentation/pages/SurveyList'
import { MemoryRouter } from 'react-router-dom'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-get-client'
import { mockAccountModel } from 'tests/mocks/domain/models/account'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
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
  render(
    <MemoryRouter>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: jest.fn(),
          getCurrentAccount: jest.fn(() => mockAccountModel())
        }}
      >
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { loadSurveyListSpy }
}
