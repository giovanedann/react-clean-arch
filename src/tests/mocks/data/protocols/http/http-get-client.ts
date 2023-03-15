import { faker } from '@faker-js/faker'
import {
  type HttpGetParams,
  type HttpGetClient,
  type HttpResponse,
  HttpStatusCode
} from 'data/protocols/http'
import { type LoadSurveyList } from 'domain/usecases'

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url: string = ''
  headers: any = null
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok
  }

  async get({ url, headers = null }: HttpGetParams): Promise<HttpResponse<T>> {
    this.url = url
    this.headers = headers
    return this.response
  }
}

export function mockGetRequest(): HttpGetParams {
  return {
    url: faker.internet.url(),
    headers: JSON.parse(faker.datatype.json())
  }
}

export function mockLoadSurveyItem(): LoadSurveyList.Model {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.soon(),
    didAnswer: faker.datatype.boolean(),
    question: faker.random.words(6),
    answers: [{ answer: faker.random.word(), image: faker.image.imageUrl() }]
  }
}

export function mockLoadSurveyList(): LoadSurveyList.Model[] {
  const surveyList: LoadSurveyList.Model[] = []

  for (let i = 0; i <= 10; i++) {
    surveyList.push(mockLoadSurveyItem())
  }

  return surveyList
}
