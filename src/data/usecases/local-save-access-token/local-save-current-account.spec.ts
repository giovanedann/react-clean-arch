import { faker } from '@faker-js/faker'
import { type AccountModel } from 'domain/models'
import { SetStorageMock } from 'tests/mocks/data/protocols/cache/set-storage'
import { LocalSaveCurrentAccount } from './local-save-current-account'

type SutTypes = {
  setStorage: SetStorageMock
  sut: LocalSaveCurrentAccount
  account: AccountModel
}

function createSut(): SutTypes {
  const setStorage = new SetStorageMock()
  const sut = new LocalSaveCurrentAccount(setStorage)
  const account = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.firstName()
  }

  return { setStorage, sut, account }
}

describe('LocalSaveCurrentAccount', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should call SetStorage with correct values', async () => {
    const { sut, account, setStorage } = createSut()
    await sut.save(account)
    expect(setStorage.key).toBe('currentAccount')
    expect(setStorage.value).toStrictEqual(JSON.stringify(account))
  })

  it('should throw if SetStorage throws', async () => {
    const { sut, account, setStorage } = createSut()
    jest.spyOn(setStorage, 'set').mockImplementationOnce(() => {
      throw new Error()
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(sut.save(account)).rejects.toThrow(new Error())
  })
})
