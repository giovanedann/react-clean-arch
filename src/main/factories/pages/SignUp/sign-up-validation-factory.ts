import { ValidationComposite, ValidationBuilder } from 'validation/validators'

type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export default function signUpValidationFactory(): ValidationComposite<SignUpData> {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirmation')
      .required()
      .compareWithField('password')
      .minLength(5)
      .build()
  ])
}
