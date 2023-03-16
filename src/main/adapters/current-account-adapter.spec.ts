import { LocalStorageAdapter } from 'infra/cache/local-storage-adapter/local-storage-adapter'
import { mockAccountModel } from 'tests/mocks/domain/models/account'
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter
} from './current-account-adapter'

jest.mock('infra/cache/local-storage-adapter/local-storage-adapter')

describe('SetCurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const spy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(spy).toHaveBeenCalledWith('currentAccount', account)
  })
})

describe('GetCurrentAccountAdapter', () => {
  it('should return an account model', () => {
    const account = mockAccountModel()
    const spy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)

    const localStorageAccount = getCurrentAccountAdapter()

    expect(spy).toHaveBeenCalledWith('currentAccount')
    expect(account).toStrictEqual(localStorageAccount)
  })

  it('should return null if the currentAccount key does not exist on localStorage', () => {
    const spy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(null)

    const localStorageAccount = getCurrentAccountAdapter()

    expect(spy).toHaveBeenCalledWith('currentAccount')
    expect(localStorageAccount).toBeNull()
  })
})
