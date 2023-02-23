import { InputHTMLAttributes } from 'react'
import styles from './styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {}

export default function Input({ ...props }: Props): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <input {...props} autoComplete="off" />
      <span className={styles.status}>🔴</span>
    </div>
  )
}
