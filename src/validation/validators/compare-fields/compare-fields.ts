import { InvalidFieldError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class CompareFieldsValidation<T> implements FieldValidation<T> {
  constructor(readonly field: keyof T, private readonly compareWith: keyof T) {}

  validate(object: T): Error | null {
    return object[this.field] === object[this.compareWith]
      ? null
      : new InvalidFieldError(this.field as string)
  }
}
