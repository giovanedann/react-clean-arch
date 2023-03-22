import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from 'tests/mocks/data/protocols/http/http-get-client'
import RemoteLoadSurveyResult from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<any>
}

type SutParams = {
  url: string
}

function createSut({ url = faker.internet.url() }: SutParams): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpGetClient with correct URL', () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = createSut({ url })
    sut.load()
    expect(httpGetClientSpy.url).toEqual(url)
  })
})
