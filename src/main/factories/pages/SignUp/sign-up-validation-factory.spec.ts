import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from 'validation/validators'
import { CompareFieldsValidation } from 'validation/validators/compare-fields/compare-fields'
import signUpValidationFactory from './sign-up-validation-factory'

describe('SignUpValidationFactory', () => {
  it('should create ValidationComposite with the right validations', () => {
    const composite = signUpValidationFactory()
    expect(composite).toStrictEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
    )
  })
})
