import { type SurveyModel } from 'domain/models'
import { memo, useMemo } from 'react'
import { IoMdThumbsUp } from 'react-icons/io'
import styles from './styles.module.scss'

type Props = Pick<SurveyModel, 'date' | 'didAnswer' | 'question'>

function SurveyCard({ didAnswer, question, date }: Props): JSX.Element {
  const iconClassNames: string = useMemo(() => {
    if (!didAnswer) {
      return `${styles.icon} ${styles.notAnswered}`
    }
    return `${styles.icon}`
  }, [didAnswer])

  return (
    <li className={styles.listItem}>
      <div className={styles.surveyContent}>
        <IoMdThumbsUp
          className={iconClassNames}
          size={25}
          title="Status icon"
        />
        <time>
          <span className={styles.day}>{date.getDay()}</span>
          <span className={styles.month}>
            {date.toLocaleString('en-US', { month: 'short' })}
          </span>
          <span className={styles.year}>{date.getFullYear()}</span>
        </time>
        <p>{question}</p>
      </div>
      <footer>See results</footer>
    </li>
  )
}

export default memo(SurveyCard)
