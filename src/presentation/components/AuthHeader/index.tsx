import { memo, type MouseEvent } from 'react'
import Logo from 'presentation/components/Logo'
import styles from './styles.module.scss'
import { useApi } from 'presentation/contexts/api'
import useLogout from 'presentation/hooks/useLogout'

function AuthHeader(): JSX.Element {
  const { getCurrentAccount } = useApi()
  const logout = useLogout()

  function handleLogout(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()

    logout()
  }

  const currentAccount = getCurrentAccount()

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>{currentAccount?.name}</span>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(AuthHeader)
