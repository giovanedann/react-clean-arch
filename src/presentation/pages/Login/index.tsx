/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'

import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import { useForm } from 'presentation/contexts/form'
import { type Validation } from 'presentation/protocols/validation'
import { type Authentication } from 'domain/models'

import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { type SaveCurrentAccount } from 'domain/usecases'

type LoginData = {
  email: string
  password: string
}

type Props = {
  validation: Validation<LoginData>
  authentication: Authentication
  saveCurrentAccount: SaveCurrentAccount
}

function Login({
  validation,
  authentication,
  saveCurrentAccount
}: Props): JSX.Element {
  const {
    errorMessage,
    isLoading,
    setIsLoading,
    setErrorMessage,
    resetFormStatus
  } = useForm()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    resetFormStatus()
  }, [])

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      passwordError: validation.validate('password', loginData),
      emailError: validation.validate('email', loginData)
    }))
  }, [loginData])

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
      setErrorMessage('')
      const account = await authentication.auth(loginData)
      await saveCurrentAccount.save(account)
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
          value={loginData.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginData((prev) => ({ ...prev, email: event.target.value }))
          }}
          placeholder="Enter your e-mail"
          errorMessage={errors.emailError}
        />
        <Input
          type="password"
          name="password"
          value={loginData.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLoginData((prev) => ({ ...prev, password: event.target.value }))
          }}
          placeholder="Enter your password"
          errorMessage={errors.passwordError}
        />
        <button
          className={styles.submit}
          type="submit"
          disabled={!!errors.emailError || !!errors.passwordError}
        >
          Sign in
        </button>
        <Link to="/sign-up" className={styles.link}>
          Sign up
        </Link>
        {isLoading && <Loader message="Loading..." />}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login
