import styles from './styles.module.scss'

type ErrorProps = {
  message: string
}

export default function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
      <button>Reload</button>
    </div>
  )
}
