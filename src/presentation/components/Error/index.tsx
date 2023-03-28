import styles from './styles.module.scss'

type ErrorProps = {
  message: string
  onReloadButtonClick: () => void
}

export default function Error({
  message,
  onReloadButtonClick
}: ErrorProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
      <button onClick={onReloadButtonClick}>Reload</button>
    </div>
  )
}
