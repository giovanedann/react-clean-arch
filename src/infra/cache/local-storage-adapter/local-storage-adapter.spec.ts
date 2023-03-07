import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

type SutTypes = {
  sut: LocalStorageAdapter
  key: string
  value: any
}

function createSut(): SutTypes {
  const key = faker.database.column()
  const value = JSON.stringify(faker.datatype.json())
  const sut = new LocalStorageAdapter()
  return { sut, key, value }
}

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  it('should call localStorage with the correct values', async () => {
    const { sut, key, value } = createSut()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
