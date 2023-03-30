import { faker } from '@faker-js/faker'
import { type HttpResponse, HttpStatusCode } from 'data/protocols/http'
import {
  type HttpClient,
  type HttpMethods,
  type HttpRequest
} from 'data/protocols/http/http-client'
import { type RemoteLoadSurveyList } from 'data/usecases/load-survey-list/remote-load-survey-list'
import { type RemoteLoadSurveyResult } from 'data/usecases/load-survey-result/remote-load-survey-result'
import { type LoadSurveyList } from 'domain/usecases'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'

export class HttpClientSpy<T> implements HttpClient<T> {
  url: string = ''
  headers: any = null
  body: any = null
  method: HttpMethods | null = null
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok
  }

  async request({
    url,
    method,
    body,
    headers
  }: HttpRequest): Promise<HttpResponse<T>> {
    this.url = url
    this.method = method
    this.body = body
    this.headers = headers
    return this.response
  }
}

export function mockHttpRequest(): HttpRequest {
  const randomBody = JSON.parse(faker.datatype.json())
  const randomHeaders = JSON.parse(faker.datatype.json())

  return {
    url: faker.internet.url(),
    headers: randomHeaders,
    method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
    body: randomBody
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

export function mockRemoteSurveyItem(): RemoteLoadSurveyList.Model {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.soon().toISOString(),
    didAnswer: faker.datatype.boolean(),
    question: faker.random.words(6),
    answers: [{ answer: faker.random.word(), image: faker.image.imageUrl() }]
  }
}

export function mockLoadSurveyResult(): RemoteLoadSurveyResult.Model {
  return {
    date: faker.date.soon().toISOString(),
    didAnswer: faker.datatype.boolean(),
    question: faker.random.words(6),
    answers: [
      {
        answer: faker.random.words(2),
        image: faker.image.imageUrl(),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ min: 1, max: 100 }),
        isCurrentAccountAnswer: faker.datatype.boolean()
      },
      {
        answer: faker.random.words(2),
        image: faker.image.imageUrl(),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ min: 1, max: 100 }),
        isCurrentAccountAnswer: faker.datatype.boolean()
      }
    ]
  }
}

export function mockRemoteSurveyList(): RemoteLoadSurveyList.Model[] {
  const surveyList: RemoteLoadSurveyList.Model[] = []

  for (let i = 0; i <= 10; i++) {
    surveyList.push(mockRemoteSurveyItem())
  }

  return surveyList
}

export function mockRemoteSaveSurveyParams(): SaveSurveyResult.Params {
  return { answer: faker.random.words(3) }
}
