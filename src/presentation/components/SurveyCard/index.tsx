import { type SurveyModel } from 'domain/models'
import { memo, useMemo } from 'react'
import { IoMdThumbsUp } from 'react-icons/io'
import styles from './styles.module.scss'

type Props = Pick<SurveyModel, 'date' | 'didAnswer' | 'question'>

function SurveyCard({ didAnswer, question }: Props): JSX.Element {
  const classNames: string = useMemo(() => {
    if (!didAnswer) {
      return `${styles.icon} ${styles.notAnswered}`
    }
    return `${styles.icon}`
  }, [didAnswer])

  return (
    <li className={styles.listItem}>
      <div className={styles.surveyContent}>
        <IoMdThumbsUp className={classNames} size={25} title="Status icon" />
        <time>
          <span className={styles.day}>22</span>
          <span className={styles.month}>Jan</span>
          <span className={styles.year}>2022</span>
        </time>
        <p>{question}</p>
      </div>
      <footer>See results</footer>
    </li>
  )
}

export default memo(SurveyCard)
