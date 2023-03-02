import { ValidationComposite, ValidationBuilder } from 'validation/validators'

type LoginData = {
  email: string
  password: string
}

export default function loginValidationFactory(): ValidationComposite<LoginData> {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
}
