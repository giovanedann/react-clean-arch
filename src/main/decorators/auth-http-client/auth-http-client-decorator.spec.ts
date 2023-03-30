import { GetStorageSpy } from 'tests/mocks/data/protocols/cache/get-storage'
import {
  HttpClientSpy,
  mockHttpRequest
} from 'tests/mocks/data/protocols/http/http-client'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import { AuthHttpClientDecorator } from './auth-http-client-decorator'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthHttpClientDecorator
  httpClientSpy: HttpClientSpy<any>
}

function createSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthHttpClientDecorator(getStorageSpy, httpClientSpy)

  return { getStorageSpy, sut, httpClientSpy }
}

describe('AuthHttpClientDecorator', () => {
  it('should call GetStorage with the right key', async () => {
    const { sut, getStorageSpy } = createSut()

    await sut.request(mockHttpRequest())

    expect(getStorageSpy.key).toBe('currentAccount')
  })

  it('should not add auth headers to the request if getStorage is invalid', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut()

    const httpRequestParams = mockHttpRequest()
    getStorageSpy.value = null
    await sut.request(httpRequestParams)

    expect(httpClientSpy.url).toBe(httpRequestParams.url)
    expect(httpClientSpy.method).toBe(httpRequestParams.method)
    expect(httpClientSpy.headers).toStrictEqual(httpRequestParams.headers)
  })

  it('should add auth headers to the request if getStorage return accessToken', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut()

    getStorageSpy.value = mockAccountModel()
    const httpRequestParams = mockHttpRequest()
    delete httpRequestParams.headers
    await sut.request(httpRequestParams)

    expect(httpClientSpy.url).toBe(httpRequestParams.url)
    expect(httpClientSpy.method).toBe(httpRequestParams.method)
    expect(httpClientSpy.headers).toStrictEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should append auth headers to the request headers if getStorage return accessToken', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut()

    const httpRequestParams = mockHttpRequest()
    getStorageSpy.value = mockAccountModel()
    await sut.request(httpRequestParams)

    expect(httpClientSpy.url).toBe(httpRequestParams.url)
    expect(httpClientSpy.method).toBe(httpRequestParams.method)
    expect(httpClientSpy.headers).toStrictEqual({
      ...httpRequestParams.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return the same result of HttpClient', async () => {
    const { sut, httpClientSpy } = createSut()

    const response = await sut.request(mockHttpRequest())

    expect(response).toStrictEqual(httpClientSpy.response)
  })
})
