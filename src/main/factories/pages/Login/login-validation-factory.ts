import { ValidationComposite, ValidationBuilder } from 'validation/validators'

export default function loginValidationFactory(): ValidationComposite {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
}
