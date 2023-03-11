import { UnexpectedError } from 'domain/errors'
import { type AccountModel } from 'domain/models'
import { LocalStorageAdapter } from 'infra/cache/local-storage-adapter/local-storage-adapter'
import { mockAccountModel } from 'tests/mocks/domain/models/authentication'
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

  it('should throw UnexpectedError if account does not have an access token', () => {
    expect(() => {
      setCurrentAccountAdapter(null as unknown as AccountModel)
    }).toThrow(new UnexpectedError())
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
