import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import {
  HttpClientSpy,
  mockRemoteSurveyList
} from 'tests/mocks/data/protocols/http/http-client'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpClientSpy)

  httpClientSpy.response.body = []

  return { sut, httpClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  it('should call HttpClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = createSut(url)

    await sut.loadAll()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.loadAll()).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of RemoteLoadSurveyList models if HttpClient returns 200', async () => {
    const { httpClientSpy, sut } = createSut()
    const body = mockRemoteSurveyList()

    const adaptedData = body.map((item) => ({
      ...item,
      date: new Date(item.date)
    }))

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }

    const surveyList = await sut.loadAll()
    expect(surveyList).toStrictEqual(adaptedData)
  })

  it('should throw unexpected error if response have no body on 200', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: undefined
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should return an empty array on 204', async () => {
    const { httpClientSpy, sut } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: undefined
    }

    const list = await sut.loadAll()

    expect(list).toBeInstanceOf(Array)
    expect(list).toHaveLength(0)
  })
})
