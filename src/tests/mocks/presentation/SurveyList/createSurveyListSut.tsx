import { render } from '@testing-library/react'
import { type SurveyModel } from 'domain/models'
import { type LoadSurveyList } from 'domain/usecases'
import SurveyList from 'presentation/pages/SurveyList'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

export class LoadSurveyListSpy implements LoadSurveyList {
  calls: number = 0

  async loadAll(): Promise<SurveyModel[]> {
    this.calls += 1
    return []
  }
}

export default function createSurveyListSut(): SutTypes {
  const loadSurveyListSpy = new LoadSurveyListSpy()

  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}
