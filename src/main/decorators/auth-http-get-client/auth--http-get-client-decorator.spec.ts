import { GetStorageSpy } from 'tests/mocks/data/protocols/cache/get-storage'
import { mockGetRequest } from 'tests/mocks/data/protocols/http/http-get-client'
import { AuthorizeHttpGetClientDecorator } from './auth--http-get-client-decorator'

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with the right key', async () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('currentAccount')
  })
})
