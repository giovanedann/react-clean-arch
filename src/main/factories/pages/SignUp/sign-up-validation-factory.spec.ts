import { ValidationBuilder, ValidationComposite } from 'validation/validators'
import signUpValidationFactory from './sign-up-validation-factory'

describe('SignUpValidationFactory', () => {
  it('should create ValidationComposite with the right validations', () => {
    const composite = signUpValidationFactory()
    expect(composite).toStrictEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(5).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .compareWithField('password')
          .build()
      ])
    )
  })
})
