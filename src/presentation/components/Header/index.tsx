import Logo from 'presentation/components/Logo'
import { memo } from 'react'
import styles from './styles.module.scss'

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(Header)
