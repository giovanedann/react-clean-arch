import { faker } from '@faker-js/faker'
import { type LoadSurveyResult } from 'domain/usecases/load-survey-result'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'

export function mockSurveyResultModel(): LoadSurveyResult.Model {
  return {
    question: faker.random.words(10),
    didAnswer: faker.datatype.boolean(),
    answers: [
      {
        answer: faker.random.word(),
        count: Number(faker.random.numeric()),
        percent: Number(faker.random.numeric(2)),
        image: faker.image.imageUrl(),
        isCurrentAccountAnswer: true
      },
      {
        answer: faker.random.word(),
        count: Number(faker.random.numeric()),
        percent: Number(faker.random.numeric(2)),
        isCurrentAccountAnswer: false
      }
    ],
    date: faker.date.recent()
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  calls: number = 0
  surveyResult = mockSurveyResultModel()

  async load(): Promise<LoadSurveyResult.Model> {
    this.calls += 1
    return this.surveyResult
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  calls: number = 0
  surveyResult = mockSurveyResultModel()

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.calls += 1
    return this.surveyResult
  }
}
