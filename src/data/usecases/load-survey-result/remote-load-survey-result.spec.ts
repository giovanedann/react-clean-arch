import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import {
  HttpClientSpy,
  mockLoadSurveyResult
} from 'tests/mocks/data/protocols/http/http-client'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>
}

type SutParams = {
  url?: string
}

function createSut({ url = faker.internet.url() }: SutParams = {}): SutTypes {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyResult.Model>()

  httpClientSpy.response = {
    ...httpClientSpy.response,
    body: mockLoadSurveyResult()
  }

  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpClient with correct URL and method', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = createSut({ url })

    sut.load()
    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.method).toEqual('get')
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.load()).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.load()).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if response have no body on 200', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: null as any
    }

    await expect(sut.load()).rejects.toThrow(new UnexpectedError())
  })

  it('should return a survey result on 200', async () => {
    const { httpClientSpy, sut } = createSut()

    const surveyResult = mockLoadSurveyResult()

    const adaptedSurveyResult = {
      ...surveyResult,
      date: new Date(surveyResult.date)
    }

    httpClientSpy.response = {
      ...httpClientSpy.response,
      body: surveyResult
    }

    const response = await sut.load()

    expect(response).toStrictEqual(adaptedSurveyResult)
  })
})
