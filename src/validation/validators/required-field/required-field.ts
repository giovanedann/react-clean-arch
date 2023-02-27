import { RequiredFieldError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}
