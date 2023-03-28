import { type LoadSurveyList } from 'domain/usecases'
import { memo, useMemo } from 'react'
import { IoMdThumbsUp } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import DateCard from '../DateCard'
import styles from './styles.module.scss'

type Props = Pick<LoadSurveyList.Model, 'date' | 'didAnswer' | 'question' | 'id'>

function SurveyCard({ didAnswer, question, date, id }: Props): JSX.Element {
  const iconClassNames: string = useMemo(() => {
    if (!didAnswer) {
      return `${styles.icon} ${styles.notAnswered}`
    }
    return `${styles.icon}`
  }, [didAnswer])

  const navigate = useNavigate()

  return (
    <li className={styles.listItem}>
      <div className={styles.surveyContent}>
        <IoMdThumbsUp
          className={iconClassNames}
          size={25}
          title="Status icon"
        />
        <DateCard date={date} className={styles.dateCardWrapper} />
        <p>{question}</p>
      </div>
      <footer onClick={() => { navigate(`/surveys/${id}`) }}>
        See results
      </footer>
    </li>
  )
}

export default memo(SurveyCard)
