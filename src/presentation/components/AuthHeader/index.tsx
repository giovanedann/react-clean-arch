import Logo from 'presentation/components/Logo'
import { memo } from 'react'
import styles from './styles.module.scss'

function AuthHeader(): JSX.Element {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>User</span>
          <a href="#">Logout</a>
        </div>
      </div>
    </header>
  )
}

export default memo(AuthHeader)
