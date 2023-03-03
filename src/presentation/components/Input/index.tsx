/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useRef, type InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string
}

export default function Input({
  errorMessage = '',
  ...props
}: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={styles.inputWrapper}
      data-status={errorMessage ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        autoComplete="off"
        ref={inputRef}
        id={props.name}
        readOnly
        placeholder=" "
        onFocus={(e) => {
          e.target.readOnly = false
        }}
      />
      <label
        role="label"
        htmlFor={props.name}
        onClick={() => {
          inputRef?.current?.focus()
        }}
        title={errorMessage}
      >
        {props.placeholder}
      </label>
    </div>
  )
}
