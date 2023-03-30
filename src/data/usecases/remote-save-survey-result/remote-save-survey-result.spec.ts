import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'
import {
  HttpClientSpy,
  mockRemoteSaveSurveyParams
} from 'tests/mocks/data/protocols/http/http-client'
import { mockSurveyResultModel } from 'tests/mocks/domain/models/load-survey-result'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>
  sutParams: SaveSurveyResult.Params
}

type SutParams = {
  url?: string
}

function createSut({ url = faker.internet.url() }: SutParams): SutTypes {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>()

  const sutParams = mockRemoteSaveSurveyParams()

  httpClientSpy.response = {
    ...httpClientSpy.response,
    body: mockSurveyResultModel()
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
})
