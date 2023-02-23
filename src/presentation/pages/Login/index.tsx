import styles from './styles.scss'
import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'
import { useForm } from 'presentation/contexts/form'

function Login(): JSX.Element {
  const { errorMessage, isLoading } = useForm()

  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
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
