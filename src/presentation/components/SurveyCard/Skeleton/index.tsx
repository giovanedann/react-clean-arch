import { memo } from 'react'
import styles from './styles.module.scss'

function SurveyCardSkeleton(): JSX.Element {
  return <li className={styles.surveyItemEmpty} />
}

export default memo(SurveyCardSkeleton)
