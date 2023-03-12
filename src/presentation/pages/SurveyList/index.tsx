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
  const [error, setError] = useState<string>('')

  async function loadSurveys(): Promise<void> {
    try {
      const surveys = await loadSurveyList.loadAll()
      setSurveys(surveys)
    } catch (error: any) {
      setError(error.message)
    }
  }

  useEffect(() => {
    loadSurveys()
  }, [])

  return (
    <div className={styles.surveyListWrapper}>
      <AuthHeader />

      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        {!error && surveys.length === 0 && <SurveyListSkeleton />}

        {!error && surveys.length > 0 && (
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

        {error && (
          <div>
            <h2>{error}</h2>
            <button>Reload</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
