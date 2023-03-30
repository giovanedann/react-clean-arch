import remoteLoadSurveyResultFactory from 'main/factories/usecases/load-survey-result/load-survey-result-factory'
import remoteSaveSurveyResultFactory from 'main/factories/usecases/save-survey-result/save-survey-result-factory'
import SurveyResult from 'presentation/pages/SurveyResult'
import { useParams } from 'react-router-dom'

export default function SurveyResultPageFactory(): JSX.Element {
  const params = useParams()

  return (
    <SurveyResult
      loadSurveyResult={remoteLoadSurveyResultFactory(String(params.id))}
      saveSurveyResult={remoteSaveSurveyResultFactory(String(params.id))}
    />
  )
}
