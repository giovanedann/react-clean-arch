import { HttpPostClientSpy } from 'data/tests/http-client-mock'
import RemoteAuthentication from './remote-authentication'
import { faker } from '@faker-js/faker'
import { mockAuthentication } from 'domain/tests/authentication-mock'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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
})
