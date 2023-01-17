import { HttpPostClientSpy } from 'data/tests/http-client-mock'
import RemoteAuthentication from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with the correct url', async () => {
    const url = 'url_test'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
