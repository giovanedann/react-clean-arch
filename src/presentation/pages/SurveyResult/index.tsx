import AuthHeader from 'presentation/components/AuthHeader'
import DateCard from 'presentation/components/DateCard'
import Loader from 'presentation/components/Loader'
import FlipMove from 'react-flip-move'
import styles from './styles.module.scss'

export default function SurveyResult(): JSX.Element {
  return (
    <main className={styles.wrapper}>
      <AuthHeader />
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
            <img src="https://cdn.cdnlogo.com/logos/n/80/next-js.svg" alt="" />
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
    </main>
  )
}
