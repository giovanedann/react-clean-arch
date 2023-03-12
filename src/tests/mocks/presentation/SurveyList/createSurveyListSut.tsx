import { render } from '@testing-library/react'
import { type SurveyModel } from 'domain/models'
import { type LoadSurveyList } from 'domain/usecases'
import SurveyList from 'presentation/pages/SurveyList'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-get-client'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

export class LoadSurveyListSpy implements LoadSurveyList {
  calls: number = 0
  surveys: SurveyModel[] = mockLoadSurveyList()

  async loadAll(): Promise<SurveyModel[]> {
    this.calls += 1
    return this.surveys
  }
}

export default function createSurveyListSut(
  loadSurveyListSpy = new LoadSurveyListSpy()
): SutTypes {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}
