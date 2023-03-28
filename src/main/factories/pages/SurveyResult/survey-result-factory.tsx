import remoteLoadSurveyResultFactory from 'main/factories/usecases/load-survey-result/load-survey-result-factory'
import SurveyResult from 'presentation/pages/SurveyResult'
import { useParams } from 'react-router-dom'

export default function surveyResultPageFactory(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  return (
    <SurveyResult
      loadSurveyResult={remoteLoadSurveyResultFactory(String(id))}
    />
  )
}
