import { InvalidLengthError } from 'validation/errors'
import { MinLengthValidation } from './min-length'

function createSut(): MinLengthValidation {
  return new MinLengthValidation('password', 6)
}

describe('MinLengthValidation', () => {
  it('should return error if field length is less than constructor length', () => {
    const sut = createSut()
    const error = sut.validate('12345') as Error
    expect(error).toBeInstanceOf(InvalidLengthError)
    expect(error.message).toEqual('Value provided to password should have at least 6 characters')
  })

  it('should return null if the field length is higher or equal the constructor length', () => {
    const sut = createSut()
    const error = sut.validate('1234567')
    expect(error).toBeNull()
  })
})
