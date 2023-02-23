import styles from './styles.scss'
import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import { useForm } from 'presentation/contexts/form'
import { Validation } from 'presentation/protocols/validation'
import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
}

function Login({ validation }: Props): JSX.Element {
  const { errorMessage, isLoading } = useForm()

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

  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
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
        <button className={styles.submit} type="submit" disabled>
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        {isLoading && <Loader message="Carregando..." />}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login
