export interface Validation<T> {
  validate: (fieldName: string, object: T) => string
}
