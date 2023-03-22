import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import {
  HttpGetClientSpy,
  mockLoadSurveyResult
} from 'tests/mocks/data/protocols/http/http-get-client'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>
}

type SutParams = {
  url?: string
}

function createSut({ url = faker.internet.url() }: SutParams): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>()

  httpGetClientSpy.response = {
    ...httpGetClientSpy.response,
    body: mockLoadSurveyResult()
  }

  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpGetClient with correct URL', () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = createSut({ url })

    sut.load()
    expect(httpGetClientSpy.url).toEqual(url)
  })

  it('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = createSut({})

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.load()).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = createSut({})

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.load()).rejects.toThrow(new UnexpectedError())
  })

  it('should throw unexpected error if response have no body on 200', async () => {
    const { httpGetClientSpy, sut } = createSut({})

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: null as any
    }

    await expect(sut.load()).rejects.toThrow(new UnexpectedError())
  })

  it('should return a survey result on 200', async () => {
    const { httpGetClientSpy, sut } = createSut({})

    const surveyResult = mockLoadSurveyResult()

    const adaptedSurveyResult = {
      ...surveyResult,
      date: new Date(surveyResult.date)
    }

    httpGetClientSpy.response = {
      ...httpGetClientSpy.response,
      body: surveyResult
    }

    const response = await sut.load()

    expect(response).toStrictEqual(adaptedSurveyResult)
  })
})
