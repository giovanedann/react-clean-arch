import { HttpPostClientSpy } from 'data/tests/http-client-mock'
import RemoteAuthentication from './remote-authentication'
import { faker } from '@faker-js/faker'
import { mockAuthentication } from 'domain/tests/authentication-mock'
import { HttpStatusCode } from 'data/protocols/http/http-response'
import { InvalidCredentialsError } from 'domain/errors/invalid-credentials'
import { UnexpectedError } from 'domain/errors/unexpected'
import { AuthenticationParams } from 'domain/usecases/authentication'
import { AccountModel } from 'domain/models/account'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return { httpPostClientSpy, sut }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with the correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = createSut(url)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient with the correct body', async () => {
    const { sut, httpPostClientSpy } = createSut()

    const loginCredentials = mockAuthentication()
    await sut.auth(loginCredentials)

    expect(httpPostClientSpy.body).toStrictEqual(loginCredentials)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = createSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = createSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
