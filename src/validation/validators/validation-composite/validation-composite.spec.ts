import { FieldValidationSpy } from 'tests/mocks/validation/validators/validation-composite/field-validation'
import { ValidationComposite } from 'validation/validators/validation-composite/validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

function createSut(): SutTypes {
  const fieldValidationSpies = [
    new FieldValidationSpy('randomfield'),
    new FieldValidationSpy('randomfield')
  ]

  const sut = new ValidationComposite(fieldValidationSpies)
  return { fieldValidationSpies, sut }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationSpies } = createSut()

    fieldValidationSpies[0].error = new Error('Validation failed')

    const error = sut.validate('randomfield', 'randomvalue')
    expect(error).toBe('Validation failed')
  })

  it('should return an empty string if none of validations fails', () => {
    const { sut } = createSut()

    const error = sut.validate('randomfield', 'randomvalue')
    expect(error).toBe('')
  })

  it('should return the first error even if more than a validator fails', () => {
    const { sut, fieldValidationSpies } = createSut()

    fieldValidationSpies[0].error = new Error('First failed')
    fieldValidationSpies[1].error = new Error('Second failed')

    const error = sut.validate('randomfield', 'randomvalue')
    expect(error).toBe('First failed')
  })
})
