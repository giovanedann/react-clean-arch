import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'
import SurveyCard from 'presentation/components/SurveyCard'
import { faker } from '@faker-js/faker'

export default function SurveyList(): JSX.Element {
  return (
    <div className={styles.surveyListWrapper}>
      <AuthHeader />
      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        <ul>
          {new Array(5).fill(true).map(() => (
            <SurveyCard
              key={crypto.randomUUID()}
              question={faker.random.words(20)}
              date={new Date(Math.floor(Math.random() * Date.now()))}
              didAnswer={Math.random() > 0.5}
            />
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  )
}
