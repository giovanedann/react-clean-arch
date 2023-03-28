import styles from './styles.module.scss'

export default function Skeleton(): JSX.Element {
  return (
    <main className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.questionWrapper}>
          <div className={styles.dateCardWrapper} />
          <div className={styles.questionContainer}>
            <div className={styles.question} />
            <div className={styles.question} />
          </div>
        </div>
        <div className={styles.answersList}>
          {new Array(5).fill(true).map((item) => (
            <li key={Math.random()}>
              <div className={styles.img} />
              <span className={styles.answer} />
            </li>
          ))}
        </div>
      </div>
    </main>
  )
}
