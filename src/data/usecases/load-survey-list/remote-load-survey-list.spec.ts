import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { UnexpectedError } from 'domain/errors'
import { type SurveyModel } from 'domain/models'
import {
  HttpGetClientSpy,
  mockLoadSurveyList
} from 'tests/mocks/data/protocols/http/http-get-client'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  httpGetClientSpy.response.body = []

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = createSut(url)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockLoadSurveyList()
    }

    const surveyList = await sut.loadAll()
    expect(surveyList).toStrictEqual(httpGetClientSpy.response.body)
  })
})
