import Spinner from 'presentation/components/Spinner'
import styles from './styles.scss'

type LoaderProps = {
  message?: string
}

export default function Loader({ message }: LoaderProps): JSX.Element {
  return (
    <div className={styles.loaderWrapper} role="loader">
      <Spinner className={styles.spinner} />
      {message && <span className={styles.message}>{message}</span>}
    </div>
  )
}
