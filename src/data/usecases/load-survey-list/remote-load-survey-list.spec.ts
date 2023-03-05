import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from 'tests/mocks/data/protocols/http/http-get-client'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
