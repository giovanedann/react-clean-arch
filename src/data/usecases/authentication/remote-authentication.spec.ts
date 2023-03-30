import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from 'domain/errors'
import { type Authentication } from 'domain/usecases'
import { HttpClientSpy } from 'tests/mocks/data/protocols/http/http-client'
import {
  mockAuthentication,
  mockAuthenticationModel
} from 'tests/mocks/domain/models/authentication'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const httpClientSpy = new HttpClientSpy<Authentication.Model>()
  const sut = new RemoteAuthentication(url, httpClientSpy)

  return { httpClientSpy, sut }
}

describe('RemoteAuthentication', () => {
  it('should call httpClient with the correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = createSut(url)

    httpClientSpy.response = {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }
    }

    const loginCredentials = mockAuthentication()
    await sut.auth(loginCredentials)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toStrictEqual(loginCredentials)
  })

  it('should throw InvalidCredentialsError if httpClient returns 401', async () => {
    const { sut, httpClientSpy } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should return an Authentication.Model if httpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut()
    const loginCredentials = mockAuthentication()
    const httpResult = mockAuthenticationModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(loginCredentials)

    expect(account).toStrictEqual(httpResult)
  })

  it('should throw UnexpectedError if httpClient has no body', async () => {
    const { sut } = createSut()

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
