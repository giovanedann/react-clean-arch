/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ChangeEvent, useReducer, useEffect } from 'react'

import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'presentation/contexts/form'
import {
  dataReducer,
  errorReducer,
  INITIAL_DATA_STATE,
  INITIAL_ERRORS_STATE
} from './reducers'
import { type Validation } from 'presentation/protocols/validation'
import { type SaveAccessToken, type Authentication } from 'domain/usecases'

type Props = {
  validation: Validation
  authentication?: Authentication
  saveAccessToken?: SaveAccessToken
}

function SignUp({ validation }: Props): JSX.Element {
  const [data, dispatchData] = useReducer(dataReducer, INITIAL_DATA_STATE)
  const [errors, dispatchError] = useReducer(errorReducer, INITIAL_ERRORS_STATE)

  const { isLoading, errorMessage } = useForm()

  // Use effect to add and remove errors based on input value
  useEffect(() => {
    const emailError = validation.validate('email', data.email)
    const nameError = validation.validate('name', data.name)
    const passwordError = validation.validate('password', data.password)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      data.passwordConfirmation
    )

    if (!emailError && errors.emailError) {
      dispatchError({ type: 'EMAIL', payload: '' })
    }

    if (!nameError && errors.nameError) {
      dispatchError({ type: 'NAME', payload: '' })
    }

    if (!passwordError && errors.passwordError) {
      dispatchError({ type: 'PASSWORD', payload: '' })
    }

    if (!passwordConfirmationError && errors.passwordConfirmationError) {
      dispatchError({
        type: 'PASSWORD_CONFIRMATION',
        payload: ''
      })
    }

    if (emailError && !errors.emailError) {
      dispatchError({ type: 'EMAIL', payload: 'Email is required' })
    }

    if (nameError && !errors.nameError) {
      dispatchError({ type: 'NAME', payload: 'Name is required' })
    }

    if (passwordError && !errors.passwordError) {
      dispatchError({ type: 'PASSWORD', payload: 'Password is required' })
    }

    if (passwordConfirmationError && !errors.passwordConfirmationError) {
      dispatchError({
        type: 'PASSWORD_CONFIRMATION',
        payload: 'Passwords not matching'
      })
    }
  }, [errors, dispatchError, validation])

  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input
          type="text"
          name="name"
          value={data.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatchData({ type: 'NAME', payload: event.target.value })
          }}
          placeholder="Digite seu nome"
          errorMessage={errors.nameError}
        />
        <Input
          type="email"
          name="email"
          value={data.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatchData({ type: 'EMAIL', payload: event.target.value })
          }}
          placeholder="Digite seu e-mail"
          errorMessage={errors.emailError}
        />
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatchData({ type: 'PASSWORD', payload: event.target.value })
          }}
          placeholder="Digite sua senha"
          errorMessage={errors.passwordError}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          value={data.passwordConfirmation}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatchData({
              type: 'PASSWORD_CONFIRMATION',
              payload: event.target.value
            })
          }}
          placeholder="Repita sua senha"
          errorMessage={errors.passwordConfirmationError}
        />
        <button
          className={styles.submit}
          type="submit"
          disabled={Object.values(errors).some((item) => item !== '')}
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