import { memo, type MouseEvent } from 'react'
import Logo from 'presentation/components/Logo'
import styles from './styles.module.scss'
import { useApi } from 'presentation/contexts/api'
import { useNavigate } from 'react-router-dom'

function AuthHeader(): JSX.Element {
  const { saveCurrentAccount } = useApi()
  const navigate = useNavigate()

  function handleLogout(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()

    saveCurrentAccount(null)
    navigate('/login')
  }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>User</span>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(AuthHeader)
