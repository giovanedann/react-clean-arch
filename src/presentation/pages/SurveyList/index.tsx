import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyListSkeleton from './Skeleton'
import { type LoadSurveyList } from 'domain/usecases'
import { useEffect, useState } from 'react'
import { type SurveyModel } from 'domain/models'
import SurveyCard from 'presentation/components/SurveyCard'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export default function SurveyList({
  loadSurveyList
}: SurveyListProps): JSX.Element {
  const [surveys, setSurveys] = useState<SurveyModel[]>([])

  async function loadSurveys(): Promise<void> {
    const surveys = await loadSurveyList.loadAll()
    setSurveys(surveys)
  }

  useEffect(() => {
    loadSurveys()
  }, [])

  return (
    <div className={styles.surveyListWrapper}>
      <AuthHeader />

      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        {surveys.length === 0 && <SurveyListSkeleton />}

        {surveys.length > 0 && (
          <ul>
            {surveys.map((survey) => (
              <SurveyCard
                key={survey.id}
                question={survey.question}
                didAnswer={survey.didAnswer}
                date={survey.date}
              />
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  )
}
