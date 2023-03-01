/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ChangeEvent, useReducer } from 'react'

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

function SignUp(): JSX.Element {
  const [data, dispatchData] = useReducer(dataReducer, INITIAL_DATA_STATE)
  const [errors] = useReducer(errorReducer, INITIAL_ERRORS_STATE)

  const { isLoading, errorMessage } = useForm()

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
          errorMessage={errors.emailError}
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
