import { faker } from '@faker-js/faker'
import { InvalidLengthError } from 'validation/errors'
import { MinLengthValidation } from './min-length'

type SutTypes = {
  sut: MinLengthValidation
  minValidLength: number
  field: string
}

function createSut(minValidLength: number): SutTypes {
  const field = faker.database.column()
  const sut = new MinLengthValidation(field, minValidLength)

  return { sut, field, minValidLength }
}

describe('MinLengthValidation', () => {
  it('should return error if field length is less than constructor length', () => {
    const { sut, field, minValidLength } = createSut(6)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(5)
    }) as Error

    console.log({ field })

    expect(error).toBeInstanceOf(InvalidLengthError)
    expect(error.message).toEqual(
      `Value provided to ${field} should have at least ${minValidLength} characters`
    )
  })

  it('should return null if the field length is higher or equal the constructor length', () => {
    const { sut, field } = createSut(6)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(7) })
    expect(error).toBeNull()
  })

  it('should return null if the field does not exist on the object', () => {
    const { sut } = createSut(6)
    const error = sut.validate({ iDontExist: faker.random.alphaNumeric(7) })
    expect(error).toBeNull()
  })
})
