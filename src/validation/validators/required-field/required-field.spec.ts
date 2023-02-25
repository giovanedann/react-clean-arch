import { faker } from '@faker-js/faker'
import { RequiredFieldError } from 'validation/errors/required-field'
import { RequiredFieldValidation } from 'validation/validators/required-field/required-field'

function createSut(): RequiredFieldValidation {
  return new RequiredFieldValidation(faker.database.column())
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = createSut()
    const error = sut.validate('')
    expect(error).toBeInstanceOf(RequiredFieldError)
  })

  it('should return null if field is not empty', () => {
    const sut = createSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeNull()
  })
})
