import { faker } from '@faker-js/faker'
import { type RemoteSurveyResultModel } from 'data/models/remote-survey-result'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'
import {
  HttpClientSpy,
  mockLoadSurveyResult,
  mockRemoteSaveSurveyParams
} from 'tests/mocks/data/protocols/http/http-client'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSurveyResultModel>
  sutParams: SaveSurveyResult.Params
}

type SutParams = {
  url?: string
}

function createSut({ url = faker.internet.url() }: SutParams): SutTypes {
  const httpClientSpy = new HttpClientSpy<RemoteSurveyResultModel>()

  const sutParams = mockRemoteSaveSurveyParams()

  httpClientSpy.response = {
    ...httpClientSpy.response,
    body: mockLoadSurveyResult()
  }

  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)

  return { sut, httpClientSpy, sutParams }
}

describe('RemoteSaveSurveyResult', () => {
  it('should call HttpClient with correct values', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut, sutParams } = createSut({ url })

    sut.save(sutParams)

    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.method).toEqual('put')
    expect(httpClientSpy.body).toStrictEqual(sutParams)
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { httpClientSpy, sut, sutParams } = createSut({})

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.save(sutParams)).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut, sutParams } = createSut({})

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.save(sutParams)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if response have no body on 200', async () => {
    const { httpClientSpy, sut, sutParams } = createSut({})

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: null as any
    }

    await expect(sut.save(sutParams)).rejects.toThrow(new UnexpectedError())
  })

  it('should return a survey result on 200', async () => {
    const { httpClientSpy, sut, sutParams } = createSut({})

    const surveyResult = mockLoadSurveyResult()

    const adaptedSurveyResult = {
      ...surveyResult,
      date: new Date(surveyResult.date)
    }

    httpClientSpy.response = {
      ...httpClientSpy.response,
      body: surveyResult
    }

    const response = await sut.save(sutParams)

    expect(response).toStrictEqual(adaptedSurveyResult)
  })
})
