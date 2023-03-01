/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ChangeEvent, useState, useReducer } from 'react'

import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'presentation/contexts/form'

type InputActionType = 'NAME' | 'EMAIL' | 'PASSWORD' | 'PASSWORD_CONFIRMATION'

type InputAction = {
  type: InputActionType
  payload: string
}

type SignUpState = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const INITIAL_STATE: SignUpState = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: ''
}

function reducer(
  state: SignUpState = INITIAL_STATE,
  action: InputAction
): SignUpState {
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

function SignUp(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [errors] = useState<Record<string, string>>({
    emailError: '',
    passwordError: ''
  })

  const { isLoading, errorMessage } = useForm()

  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input
          type="text"
          name="name"
          value={state.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'NAME', payload: event.target.value })
          }}
          placeholder="Digite seu e-mail"
          errorMessage={errors.emailError}
        />
        <Input
          type="email"
          name="email"
          value={state.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'EMAIL', payload: event.target.value })
          }}
          placeholder="Digite seu e-mail"
          errorMessage={errors.emailError}
        />
        <Input
          type="password"
          name="password"
          value={state.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PASSWORD', payload: event.target.value })
          }}
          placeholder="Digite sua senha"
          errorMessage={errors.passwordError}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          value={state.passwordConfirmation}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: 'PASSWORD_CONFIRMATION',
              payload: event.target.value
            })
          }}
          placeholder="Repita sua senha"
          errorMessage={errors.passwordError}
        />
        <button
          className={styles.submit}
          type="submit"
          disabled={!!errors.emailError || !!errors.passwordError}
        >
          Entrar
        </button>
        <Link to="/login" className={styles.link}>
          Voltar para o login
        </Link>
        {isLoading && <Loader message="Carregando..." />}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
      <Footer />
    </div>
  )
}

export default SignUp
