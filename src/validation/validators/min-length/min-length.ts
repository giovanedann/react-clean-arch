import { InvalidLengthError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class MinLengthValidation<T = any> implements FieldValidation<T> {
  constructor(
    readonly field: keyof T,
    private readonly minValidLength: number
  ) {}

  validate(object: T): Error | null {
    const isLengthValid =
      !object[this.field] ||
      (object[this.field] as string).length >= this.minValidLength

    return isLengthValid
      ? null
      : new InvalidLengthError(this.field as string, this.minValidLength)
  }
}
