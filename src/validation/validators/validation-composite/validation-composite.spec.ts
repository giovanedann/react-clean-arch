import { faker } from '@faker-js/faker'
import { FieldValidationSpy } from 'tests/mocks/validation/validators/validation-composite/field-validation'
import { ValidationComposite } from 'validation/validators'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

function createSut(field: string): SutTypes {
  const fieldValidationSpies = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]

  const sut = ValidationComposite.build(fieldValidationSpies)
  return { fieldValidationSpies, sut }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const field = faker.random.word()
    const errorMessage = faker.random.words()
    const { sut, fieldValidationSpies } = createSut(field)

    fieldValidationSpies[0].error = new Error(errorMessage)

    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  it('should return an empty string if none of validations fails', () => {
    const field = faker.random.word()
    const { sut } = createSut(field)

    const error = sut.validate(field, faker.random.word())
    expect(error).toBeFalsy()
    expect(error).toBe('')
  })

  it('should return the first error even if more than a validator fails', () => {
    const field = faker.random.word()
    const { sut, fieldValidationSpies } = createSut(field)
    const firstErrorMessage = faker.random.words()
    const secondErrorMessage = faker.random.words()

    fieldValidationSpies[0].error = new Error(firstErrorMessage)
    fieldValidationSpies[1].error = new Error(secondErrorMessage)

    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })
})
