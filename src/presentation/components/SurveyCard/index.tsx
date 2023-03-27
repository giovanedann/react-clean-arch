import { type LoadSurveyList } from 'domain/usecases'
import { memo, useMemo } from 'react'
import { IoMdThumbsUp } from 'react-icons/io'
import DateCard from '../DateCard'
import styles from './styles.module.scss'

type Props = Pick<LoadSurveyList.Model, 'date' | 'didAnswer' | 'question'>

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
        <DateCard date={date} />
        <p>{question}</p>
      </div>
      <footer>See results</footer>
    </li>
  )
}

export default memo(SurveyCard)
