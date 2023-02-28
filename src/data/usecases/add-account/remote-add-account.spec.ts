import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'data/protocols/http'
import { EmailAlreadyInUseError, UnexpectedError } from 'domain/errors'
import { type AccountModel, type AuthenticationParams } from 'domain/models'
import { type AddAccountParams } from 'domain/usecases'
import { HttpPostClientSpy } from 'tests/mocks/data/protocols/http'
import { mockAddAccount } from 'tests/mocks/domain/models/add-account'
import { mockAccountModel } from 'tests/mocks/domain/models/authentication'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
  body: AddAccountParams
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const body = mockAddAccount()

  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { httpPostClientSpy, sut, body }
}

describe('RemoteAddAccount', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should call HttpPostClient with the correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy, body } = createSut(url)
    const result = mockAccountModel()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    await sut.add(body)

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy, body } = createSut()
    const result = mockAccountModel()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    await sut.add(body)

    expect(httpPostClientSpy.body).toStrictEqual(body)
  })

  it('should throw EmailAlreadyInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy, body } = createSut()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.forbidden }

    await expect(sut.add(body)).rejects.toThrow(new EmailAlreadyInUseError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy, body } = createSut()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.badRequest }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy, body } = createSut()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.serverError }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy, body } = createSut()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.notFound }

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient does not return body', async () => {
    const { sut, body } = createSut()

    await expect(sut.add(body)).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy, body } = createSut()
    const result = mockAccountModel()

    httpPostClientSpy.response = { statusCode: HttpStatusCode.ok, body: result }
    const response = await sut.add(body)

    expect(response).toStrictEqual(result)
  })
})
