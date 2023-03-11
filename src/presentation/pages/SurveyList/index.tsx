import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyListSkeleton from './Skeleton'
import { type LoadSurveyList } from 'domain/usecases'
import { useEffect } from 'react'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export default function SurveyList({ loadSurveyList }: SurveyListProps): JSX.Element {
  useEffect(() => {
    loadSurveyList.loadAll()
  }, [])

  return (
    <div className={styles.surveyListWrapper}>
      <AuthHeader />

      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        <ul>
          <SurveyListSkeleton />
        </ul>
      </div>

      <Footer />
    </div>
  )
}
