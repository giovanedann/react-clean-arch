import { type LoadSurveyResult } from 'domain/usecases/load-survey-result'
import AuthHeader from 'presentation/components/AuthHeader'
import DateCard from 'presentation/components/DateCard'
import Error from 'presentation/components/Error'
import Loader from 'presentation/components/Loader'
import { useState } from 'react'
import FlipMove from 'react-flip-move'
import Skeleton from './Skeleton'
import styles from './styles.module.scss'

export default function SurveyResult(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [surveyResult, setsurveyResult] =
    useState<LoadSurveyResult.Model | null>(null)

  return (
    <main className={styles.wrapper}>
      <AuthHeader />
      {!isLoading && !error && surveyResult && (
        <div className={styles.contentContainer}>
          <div className={styles.questionWrapper}>
            <DateCard date={new Date()} className={styles.dateCardWrapper} />
            <h2>What is your favorite web framework?</h2>
          </div>
          <FlipMove className={styles.answersList}>
            <li>
              <img
                src="https://logospng.org/download/react/logo-react-1024.png"
                alt=""
              />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percentage}>40%</span>
            </li>
            <li className={styles.voted}>
              <img
                src="https://cdn.cdnlogo.com/logos/n/80/next-js.svg"
                alt=""
              />
              <span className={styles.answer}>NextJS</span>
              <span className={styles.percentage}>50%</span>
            </li>
            <li>
              <img
                src="https://logospng.org/wp-content/uploads/vue-js.png"
                alt=""
              />
              <span className={styles.answer}>VueJS</span>
              <span className={styles.percentage}>10%</span>
            </li>
          </FlipMove>

          <button type="button">Back</button>

          <div className={styles.loaderWrapper}>
            <Loader message="Loading..." />
          </div>
        </div>
      )}

      {isLoading && !error && <Skeleton />}

      {error && (
        <Error
          message="Oops... Something got wrong"
          onReloadButtonClick={() => {}}
        />
      )}
    </main>
  )
}
