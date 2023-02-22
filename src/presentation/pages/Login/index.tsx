import styles from './styles.scss'
import Header from 'presentation/components/Header'
import Footer from 'presentation/components/Footer'
import Input from 'presentation/components/Input'
import Loader from 'presentation/components/Loader'

function Login(): JSX.Element {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <Loader message="Carregando..." />
      </form>
      <Footer />
    </div>
  )
}

export default Login
