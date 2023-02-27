import { faker } from '@faker-js/faker'
import { SetStorageSpy } from 'tests/mocks/data/protocols/cache/set-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct values', async () => {
    const setStorage = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorage)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
