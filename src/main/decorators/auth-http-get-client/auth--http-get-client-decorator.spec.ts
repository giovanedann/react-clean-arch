import { GetStorageSpy } from 'tests/mocks/data/protocols/cache/get-storage'
import { mockGetRequest } from 'tests/mocks/data/protocols/http/http-get-client'
import { AuthorizeHttpGetClientDecorator } from './auth--http-get-client-decorator'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthorizeHttpGetClientDecorator
}

function createSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)

  return { getStorageSpy, sut }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with the right key', async () => {
    const { sut, getStorageSpy } = createSut()

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('currentAccount')
  })
})
