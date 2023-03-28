import { useMemo } from 'react'
import styles from './styles.module.scss'

type DateCardProps = {
  date: Date
  className?: string
}

export default function DateCard({
  date,
  className
}: DateCardProps): JSX.Element {
  const dateCardClassnames = useMemo(() => {
    if (className) {
      return `${className} ${styles.wrapper}`
    }

    return `${styles.wrapper}`
  }, [className])

  return (
    <time className={dateCardClassnames}>
      <span className={styles.day}>{date.getDay()}</span>
      <span className={styles.month}>
        {date.toLocaleString('en-US', { month: 'short' })}
      </span>
      <span className={styles.year}>{date.getFullYear()}</span>
    </time>
  )
}
