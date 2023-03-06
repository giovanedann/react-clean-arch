import { IoMdThumbsUp } from 'react-icons/io'

import Footer from 'presentation/components/Footer'
import AuthHeader from 'presentation/components/AuthHeader'
import styles from './styles.module.scss'

export default function SurveyList(): JSX.Element {
  return (
    <div className={styles.surveyListWrapper}>
      <AuthHeader />

      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        <ul>
          {new Array(5).fill(true).map(() => (
            <li key={crypto.randomUUID()}>
              <div className={styles.surveyContent}>
                <IoMdThumbsUp className={styles.icon} size={25} />
                <time>
                  <span className={styles.day}>22</span>
                  <span className={styles.month}>Jan</span>
                  <span className={styles.year}>2022</span>
                </time>
                <p>What is your favorite web framework?</p>
              </div>
              <footer>See results</footer>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  )
}
