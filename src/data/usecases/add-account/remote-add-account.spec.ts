import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { EmailAlreadyInUseError, UnexpectedError } from 'domain/errors'
import { type AddAccount } from 'domain/usecases'
import { HttpClientSpy } from 'tests/mocks/data/protocols/http'
import { mockAddAccount } from 'tests/mocks/domain/models/add-account'
import { mockAuthenticationModel } from 'tests/mocks/domain/models/authentication'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
  body: AddAccount.Params
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const body = mockAddAccount()

  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)

  return { httpClientSpy, sut, body }
}

describe('RemoteAddAccount', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should call httpClient with the correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy, body } = createSut(url)
    const result = mockAuthenticationModel()

    httpClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    await sut.add(body)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  it('should call httpClient with correct body', async () => {
    const { sut, httpClientSpy, body } = createSut()
    const result = mockAuthenticationModel()

    httpClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    await sut.add(body)

    expect(httpClientSpy.body).toStrictEqual(body)
  })

  it('should throw EmailAlreadyInUseError if httpClient returns 403', async () => {
    const { sut, httpClientSpy, body } = createSut()

    httpClientSpy.response = { statusCode: HttpStatusCode.forbidden }

    await expect(sut.add(body)).rejects.toThrow(new EmailAlreadyInUseError())
  })

  it('should throw UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy, body } = createSut()

    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy, body } = createSut()

    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy, body } = createSut()

    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if httpClient does not return body', async () => {
    const { sut, body } = createSut()

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should return an RemoteAddAccount model if httpClient returns 200', async () => {
    const { sut, httpClientSpy, body } = createSut()
    const result = mockAuthenticationModel()

    httpClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    const response = await sut.add(body)

    expect(response).toStrictEqual(result)
  })
})
