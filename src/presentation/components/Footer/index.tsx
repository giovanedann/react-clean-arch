import { memo } from 'react'
import styles from './styles.module.scss'

function Footer(): JSX.Element {
  return <footer className={styles.footer} />
}

export default memo(Footer)
