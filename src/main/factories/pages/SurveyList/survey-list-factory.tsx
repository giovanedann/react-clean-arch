import remoteLoadSurveyListFactory from 'main/factories/usecases/load-survey-list/load-survey-list-factory'
import SurveyList from 'presentation/pages/SurveyList'

export default function surveyListPageFactory(): JSX.Element {
  return <SurveyList loadSurveyList={remoteLoadSurveyListFactory()} />
}
