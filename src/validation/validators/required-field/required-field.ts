import { RequiredFieldError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class RequiredFieldValidation<T> implements FieldValidation<T> {
  constructor(readonly field: keyof T) {}

  validate(object: T): Error | null {
    return object[this.field] ? null : new RequiredFieldError()
  }
}
