import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

type SutTypes = {
  sut: LocalStorageAdapter
  key: string
  value: any
  parsedValue: any
}

function createSut(): SutTypes {
  const key = faker.database.column()
  const parsedValue = faker.datatype.json()

  const value = JSON.stringify(parsedValue)

  const sut = new LocalStorageAdapter()

  return { sut, key, value, parsedValue }
}

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  it('should call localStorage.set with the correct values', () => {
    const { sut, key, value } = createSut()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  it('should call localStorage.get with the correct key', () => {
    const { sut, key } = createSut()
    sut.get(key)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('should return the correct value on get', () => {
    const { sut, key, parsedValue, value } = createSut()

    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(value)

    const localStorageItem = sut.get(key)
    expect(localStorageItem).toStrictEqual(parsedValue)
  })

  it('should return null if the key is invalid', () => {
    const { sut, key } = createSut()

    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null)

    const localStorageItem = sut.get(key)
    expect(localStorageItem).toBeNull()
  })
})
