/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ErrorMessages } from 'presentation/contexts/form'
import { InputHTMLAttributes } from 'react'
import styles from './styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {}

export default function Input({ ...props }: Props): JSX.Element {
  const error = ErrorMessages[props.name as keyof typeof ErrorMessages]

  function getStatus(): string {
    return '🔴'
  }

  function getTitle(): string {
    return error
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
