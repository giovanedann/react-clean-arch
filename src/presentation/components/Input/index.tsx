/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string
}

export default function Input({
  errorMessage = '',
  ...props
}: Props): JSX.Element {
  function getStatus(): string {
    return errorMessage !== '' ? '🔴' : '🟢'
  }

  function getTitle(): string {
    return errorMessage
  }

  return (
    <div className={styles.inputWrapper}>
      <input {...props} autoComplete="off" />
      <span title={getTitle()} className={styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}
