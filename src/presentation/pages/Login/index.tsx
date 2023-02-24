/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import { useForm } from 'presentation/contexts/form'
import { Validation } from 'presentation/protocols/validation'
import { Authentication } from 'domain/models'

import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

function Login({ validation, authentication }: Props): JSX.Element {
  const { errorMessage, isLoading, setIsLoading, setErrorMessage } = useForm()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      passwordError: validation.validate('password', password),
      emailError: validation.validate('email', email)
    }))
  }, [email, password])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    const shouldPreventRequest = [
      isLoading,
      errors.emailError,
      errors.passwordError
    ].some((item) => !!item)

    if (shouldPreventRequest) return

    try {
      setIsLoading(true)
      const account = await authentication.auth({ email, password })
      localStorage.setItem('accessToken', account.accessToken)
      navigate('/')
    } catch (error: any) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
          }}
          placeholder="Digite seu e-mail"
          errorMessage={errors.emailError}
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
          placeholder="Digite sua senha"
          errorMessage={errors.passwordError}
        />
        <button
          className={styles.submit}
          type="submit"
          disabled={!!errors.emailError || !!errors.passwordError || isLoading}
        >
          Entrar
        </button>
        <Link to="/sign-up" className={styles.link}>
          Criar conta
        </Link>
        {isLoading && <Loader message="Carregando..." />}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login
