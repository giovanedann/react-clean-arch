import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyListSkeleton from './Skeleton'
import { type LoadSurveyList } from 'domain/usecases'
import { useEffect, useState } from 'react'
import Error from './Error'
import List from './List'
import { useApi } from 'presentation/contexts/api'
import { useNavigate } from 'react-router-dom'
import { AccessDeniedError } from 'domain/errors'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export default function SurveyList({
  loadSurveyList
}: SurveyListProps): JSX.Element {
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([])
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const { saveCurrentAccount } = useApi()

  async function loadSurveys(): Promise<void> {
    try {
      const surveys = await loadSurveyList.loadAll()
      setSurveys(surveys)
    } catch (error: any) {
      if (error instanceof AccessDeniedError) {
        saveCurrentAccount(null)
        navigate('/login')
        return
      }

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

        {!error && surveys.length > 0 && <List surveys={surveys} />}

        {error && <Error message={error} onReloadButtonClick={loadSurveys} />}
      </div>

      <Footer />
    </div>
  )
}
