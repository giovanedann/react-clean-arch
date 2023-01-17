import { HttpPostClientSpy } from 'data/tests/http-client-mock'
import RemoteAuthentication from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const createSut = (url: string = 'url_test'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return { httpPostClientSpy, sut }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with the correct url', async () => {
    const url = 'url_test'
    const { sut, httpPostClientSpy } = createSut(url)

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
