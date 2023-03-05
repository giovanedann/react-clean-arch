import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from 'tests/mocks/data/protocols/http/http-get-client'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy
}

function createSut(url: string = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = createSut(url)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
