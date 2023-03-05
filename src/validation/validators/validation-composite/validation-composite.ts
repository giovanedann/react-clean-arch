import { type Validation } from 'presentation/protocols/validation'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class ValidationComposite<T = any> implements Validation<T> {
  private constructor(private readonly validators: Array<FieldValidation<T>>) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(fieldName: keyof T, fieldValue: T): string {
    const validators = this.validators.filter(
      (validator) => validator.field === fieldName
    )

    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }

    return ''
  }
}
