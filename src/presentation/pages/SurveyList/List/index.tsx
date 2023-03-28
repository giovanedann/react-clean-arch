import { type LoadSurveyList } from 'domain/usecases'
import SurveyCard from 'presentation/components/SurveyCard'

type ListProps = {
  surveys: LoadSurveyList.Model[]
}

export default function List({ surveys }: ListProps): JSX.Element {
  return (
    <ul>
      {surveys.map((survey) => (
        <SurveyCard
          id={survey.id}
          key={survey.id}
          question={survey.question}
          didAnswer={survey.didAnswer}
          date={survey.date}
        />
      ))}
    </ul>
  )
}
