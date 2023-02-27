import { ValidationBuilder, ValidationComposite } from 'validation/validators'
import loginValidationFactory from './login-validation-factory'

describe('LoginValidationFactory', () => {
  it('should create ValidationComposite with the right validations', () => {
    const composite = loginValidationFactory()
    expect(composite).toStrictEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(5).build()
      ])
    )
  })
})
