export interface Validation<T> {
  validate: (fieldName: keyof T, object: T) => string
}
