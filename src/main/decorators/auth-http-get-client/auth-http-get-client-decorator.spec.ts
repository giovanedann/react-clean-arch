import { GetStorageSpy } from 'tests/mocks/data/protocols/cache/get-storage'
import { mockGetRequest } from 'tests/mocks/data/protocols/http/http-get-client'
import { AuthHttpGetClientDecorator } from './auth-http-get-client-decorator'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthHttpGetClientDecorator
}

function createSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthHttpGetClientDecorator(getStorageSpy)

  return { getStorageSpy, sut }
}

describe('AuthHttpGetClientDecorator', () => {
  it('should call GetStorage with the right key', async () => {
    const { sut, getStorageSpy } = createSut()

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('currentAccount')
  })
})
