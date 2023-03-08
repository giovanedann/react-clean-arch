import { LocalStorageAdapter } from 'infra/cache/local-storage-adapter/local-storage-adapter'
import { mockAccountModel } from 'tests/mocks/domain/models/authentication'
import setCurrentAccountAdapter from './current-account-adapter'

jest.mock('infra/cache/local-storage-adapter/local-storage-adapter')

describe('SetCurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const spy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(spy).toHaveBeenCalledWith('currentAccount', account)
  })
})
