import { type SurveyModel } from 'domain/models'
import SurveyCard from 'presentation/components/SurveyCard'

type ListProps = {
  surveys: SurveyModel[]
}

export default function List({ surveys }: ListProps): JSX.Element {
  return (
    <ul>
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          question={survey.question}
          didAnswer={survey.didAnswer}
          date={survey.date}
        />
      ))}
    </ul>
  )
}
