import { faker } from '@faker-js/faker'
import { SetStorageMock } from 'tests/mocks/data/protocols/cache/set-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  setStorage: SetStorageMock
  sut: LocalSaveAccessToken
  accessToken: string
}

function createSut(): SutTypes {
  const setStorage = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorage)
  const accessToken = faker.datatype.uuid()

  return { setStorage, sut, accessToken }
}

describe('LocalSaveAccessToken', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should call SetStorage with correct values', async () => {
    const { sut, accessToken, setStorage } = createSut()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })

  it('should throw if SetStorage throws', async () => {
    const { sut, accessToken, setStorage } = createSut()
    jest.spyOn(setStorage, 'set').mockRejectedValueOnce(new Error())

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(sut.save(accessToken)).rejects.toThrow(new Error())
  })
})
