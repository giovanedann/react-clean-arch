import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import {
  HttpGetClientSpy,
  mockRemoteSurveyList
} from 'tests/mocks/data/protocols/http/http-get-client'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
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

  it('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    await expect(sut.loadAll()).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of RemoteLoadSurveyList models if HttpGetClient returns 200', async () => {
    const { httpGetClientSpy, sut } = createSut()
    const body = mockRemoteSurveyList()

    const adaptedData = body.map((item) => ({
      ...item,
      date: new Date(item.date)
    }))

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }

    const surveyList = await sut.loadAll()
    expect(surveyList).toStrictEqual(adaptedData)
  })

  it('should throw unexpected error if response have no body on 200', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: undefined
    }

    await expect(sut.loadAll()).rejects.toThrow(new UnexpectedError())
  })

  it('should return an empty array on 204', async () => {
    const { httpGetClientSpy, sut } = createSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: undefined
    }

    const list = await sut.loadAll()

    expect(list).toBeInstanceOf(Array)
    expect(list).toHaveLength(0)
  })
})
