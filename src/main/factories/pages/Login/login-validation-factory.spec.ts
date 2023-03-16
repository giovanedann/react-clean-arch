import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from 'validation/validators'
import loginValidationFactory from './login-validation-factory'

describe('LoginValidationFactory', () => {
  it('should create ValidationComposite with the right validations', () => {
    const composite = loginValidationFactory()
    expect(composite).toStrictEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
