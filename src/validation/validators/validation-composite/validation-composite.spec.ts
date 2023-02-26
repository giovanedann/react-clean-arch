import { FieldValidationSpy } from 'tests/mocks/validation/validators/validation-composite/field-validation'
import { ValidationComposite } from 'validation/validators/validation-composite/validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy1: FieldValidationSpy
  fieldValidationSpy2: FieldValidationSpy
}

function createSut(): SutTypes {
  const fieldValidationSpy1 = new FieldValidationSpy('randomfield')
  const fieldValidationSpy2 = new FieldValidationSpy('randomfield')

  const sut = new ValidationComposite([fieldValidationSpy1, fieldValidationSpy2])
  return { fieldValidationSpy1, fieldValidationSpy2, sut }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy1 } = createSut()

    fieldValidationSpy1.error = new Error('Validation failed')

    const error = sut.validate('randomfield', 'randomvalue')
    expect(error).toBe('Validation failed')
  })

  it('should return an empty string if none of validations fails', () => {
    const { sut } = createSut()

    const error = sut.validate('randomfield', 'randomvalue')
    expect(error).toBe('')
  })
})
