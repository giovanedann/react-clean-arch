import { type LoadSurveyResult } from 'domain/usecases/load-survey-result'
import AuthHeader from 'presentation/components/AuthHeader'
import DateCard from 'presentation/components/DateCard'
import Error from 'presentation/components/Error'
import Loader from 'presentation/components/Loader'
import useHandleForbidden from 'presentation/hooks/useHandleForbidden'
import { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'
import Skeleton from './Skeleton'
import styles from './styles.module.scss'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
}

export default function SurveyResult({
  loadSurveyResult
}: SurveyResultProps): JSX.Element {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [surveyResult, setSurveyResult] =
    useState<LoadSurveyResult.Model | null>(null)

  const navigate = useNavigate()

  const handler = useHandleForbidden((error) => {
    setError(error.message)
  })

  async function loadResult(): Promise<void> {
    setIsLoading(true)

    try {
      const response = await loadSurveyResult.load()
      setSurveyResult(response)
      setIsLoading(false)
    } catch (error: any) {
      handler(error)
    }
  }

  function handleBackButtonClick(): void {
    navigate('/')
  }

  useEffect(() => {
    loadResult()
  }, [])

  return (
    <main className={styles.wrapper}>
      <AuthHeader />
      {!isLoading && !error && surveyResult && (
        <div className={styles.contentContainer}>
          <div className={styles.questionWrapper}>
            <DateCard
              date={surveyResult.date}
              className={styles.dateCardWrapper}
            />
            <h2>{surveyResult.question}</h2>
          </div>
          <FlipMove className={styles.answersList}>
            {surveyResult.answers.map((answer, index) => (
              <li
                key={answer.answer}
                className={answer.isCurrentAccountAnswer ? styles.voted : ''}
              >
                {answer.image && (
                  <img
                    src={answer.image}
                    alt={`${answer.answer} representative image`}
                  />
                )}
                <span className={styles.answer}>{answer.answer}</span>
                <span className={styles.percentage}>{answer.percent}%</span>
              </li>
            ))}
          </FlipMove>

          <button onClick={handleBackButtonClick} type="button">
            Back
          </button>

          <div className={styles.loaderWrapper}>
            <Loader message="Loading..." />
          </div>
        </div>
      )}

      {isLoading && !error && <Skeleton />}

      {error && <Error message={error} onReloadButtonClick={loadResult} />}
    </main>
  )
}
