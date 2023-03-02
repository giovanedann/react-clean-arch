export interface FieldValidation<T> {
  field: keyof T
  validate: (object: T) => Error | null
}
