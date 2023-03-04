/* istanbul ignore file */

export type InputActionType =
  | 'NAME'
  | 'EMAIL'
  | 'PASSWORD'
  | 'PASSWORD_CONFIRMATION'

export type InputAction = {
  type: InputActionType
  payload: string
}

export type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type SignUpErrors = {
  nameError: string
  emailError: string
  passwordError: string
  passwordConfirmationError: string
}

export const INITIAL_DATA_STATE: SignUpData = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: ''
}

export const INITIAL_ERRORS_STATE: SignUpErrors = {
  nameError: 'Required field',
  emailError: 'Required field',
  passwordError: 'Required field',
  passwordConfirmationError: 'Required field'
}

export function dataReducer(
  state: SignUpData = INITIAL_DATA_STATE,
  action: InputAction
): SignUpData {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    case 'PASSWORD_CONFIRMATION':
      return { ...state, passwordConfirmation: action.payload }
    case 'EMAIL':
      return { ...state, email: action.payload }
    default:
      return state
  }
}

export function errorReducer(
  state: SignUpErrors = INITIAL_ERRORS_STATE,
  action: InputAction
): SignUpErrors {
  switch (action.type) {
    case 'NAME':
      return { ...state, nameError: action.payload }
    case 'PASSWORD':
      return { ...state, passwordError: action.payload }
    case 'PASSWORD_CONFIRMATION':
      return { ...state, passwordConfirmationError: action.payload }
    case 'EMAIL':
      return { ...state, emailError: action.payload }
    default:
      return state
  }
}
