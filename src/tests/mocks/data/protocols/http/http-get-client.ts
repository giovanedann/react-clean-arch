import { faker } from '@faker-js/faker'
import {
  type HttpGetParams,
  type HttpGetClient,
  type HttpResponse,
  HttpStatusCode
} from 'data/protocols/http'
import { type SurveyModel } from 'domain/models'

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url: string = ''
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok
  }

  async get({ url }: HttpGetParams): Promise<HttpResponse<T>> {
    this.url = url
    return this.response
  }
}

export function mockGetRequest(): HttpGetParams {
  return {
    url: faker.internet.url(),
    headers: JSON.stringify(faker.datatype.json())
  }
}

export function mockLoadSurveyItem(): SurveyModel {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.soon(),
    didAnswer: faker.datatype.boolean(),
    question: faker.random.words(6),
    answers: [{ answer: faker.random.word(), image: faker.image.imageUrl() }]
  }
}

export function mockLoadSurveyList(): SurveyModel[] {
  const surveyList: SurveyModel[] = []

  for (let i = 0; i <= 10; i++) {
    surveyList.push(mockLoadSurveyItem())
  }

  return surveyList
}
