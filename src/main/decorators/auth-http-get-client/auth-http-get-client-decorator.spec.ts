import { GetStorageSpy } from 'tests/mocks/data/protocols/cache/get-storage'
import {
  HttpGetClientSpy,
  mockGetRequest
} from 'tests/mocks/data/protocols/http/http-get-client'
import { AuthHttpGetClientDecorator } from './auth-http-get-client-decorator'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy<any>
}

function createSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)

  return { getStorageSpy, sut, httpGetClientSpy }
}

describe('AuthHttpGetClientDecorator', () => {
  it('should call GetStorage with the right key', async () => {
    const { sut, getStorageSpy } = createSut()

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('currentAccount')
  })

  it('should not add auth headers to the request if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = createSut()

    const httpRequestParams = mockGetRequest()

    await sut.get(httpRequestParams)

    expect(httpGetClientSpy.url).toBe(httpRequestParams.url)
    expect(httpGetClientSpy.headers).toStrictEqual(httpRequestParams.headers)
  })
})
