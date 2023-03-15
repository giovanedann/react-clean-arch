import { render } from '@testing-library/react'
import { type LoadSurveyList } from 'domain/usecases'
import SurveyList from 'presentation/pages/SurveyList'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-get-client'

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
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}
