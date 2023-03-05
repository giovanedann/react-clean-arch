export interface FieldValidation<T = any> {
  field: keyof T
  validate: (object: T) => Error | null
}
