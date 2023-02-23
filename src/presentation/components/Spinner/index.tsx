import React from 'react'
import styles from './styles.module.scss'

type Props = React.HTMLAttributes<HTMLElement>

function Spinner(props: Props): JSX.Element {
  return (
    <div {...props} className={[styles.spinner, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
