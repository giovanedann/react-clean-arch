import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyListSkeleton from './Skeleton'

export default function SurveyList(): JSX.Element {
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
