import Footer from 'presentation/components/Footer'
import Logo from 'presentation/components/Logo'
import styles from './styles.module.scss'

export default function SurveyList(): JSX.Element {
  return (
    <div className={styles.surveyListWrapper}>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrapper}>
            <span>User</span>
            <a href="#">Logout</a>
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        <h2>Surveys</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>Jan</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>See results</footer>
          </li>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>Feb</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>See results</footer>
          </li>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>Dec</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>See results</footer>
          </li>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>Nov</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>See results</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}
