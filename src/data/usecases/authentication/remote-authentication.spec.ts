import RemoteAuthentication from './remote-authentication'
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from 'domain/errors'
import { type AuthenticationParams } from 'domain/usecases'
import { type AccountModel } from 'domain/models'
import { HttpPostClientSpy } from 'tests/mocks/data/protocols/http/http-client'
import { mockAccountModel, mockAuthentication } from 'tests/mocks/domain/models/authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

function createSut (url: string = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return { httpPostClientSpy, sut }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with the correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = createSut(url)

    httpPostClientSpy.response = {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }
    }

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient with the correct body', async () => {
    const { sut, httpPostClientSpy } = createSut()

    httpPostClientSpy.response = {
      statusCode: 200,
      body: { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }
    }

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

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut()
    const loginCredentials = mockAuthentication()
    const httpResult = mockAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(loginCredentials)

    expect(account).toStrictEqual(httpResult)
  })

  it('should throw UnexpectedError if HttpPostClient has no body', async () => {
    const { sut } = createSut()

    const loginCredentials = mockAuthentication()
    const response = sut.auth(loginCredentials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
