import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyListSkeleton from './Skeleton'
import { type LoadSurveyList } from 'domain/usecases'
import { useEffect, useState } from 'react'
import Error from 'presentation/components/Error'
import List from './List'
import useHandleForbidden from 'presentation/hooks/useHandleForbidden'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export default function SurveyList({
  loadSurveyList
}: SurveyListProps): JSX.Element {
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([])
  const [error, setError] = useState<string>('')

  const handler = useHandleForbidden((error) => {
    setError(error.message)
  })

  async function loadSurveys(): Promise<void> {
    try {
      const surveys = await loadSurveyList.loadAll()
      setError('')
      setSurveys(surveys)
    } catch (error: any) {
      handler(error)
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

        {!error && surveys.length > 0 && <List surveys={surveys} />}

        {error && <Error message={error} onReloadButtonClick={loadSurveys} />}
      </div>

      <Footer />
    </div>
  )
}
