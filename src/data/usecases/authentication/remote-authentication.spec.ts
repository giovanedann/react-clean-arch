import { HttpPostClient } from 'data/protocols/http/http-post-client'
import RemoteAuthentication from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with the correct url', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
      }
    }

    const url = 'url_test'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
