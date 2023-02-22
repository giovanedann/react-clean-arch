import Logo from 'presentation/components/Logo'
import styles from './styles.scss'

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}
