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
  it('should call SetStorage with correct values', async () => {
    const { sut, accessToken, setStorage } = createSut()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
