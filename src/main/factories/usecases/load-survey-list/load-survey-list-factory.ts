import { RemoteLoadSurveyList } from 'data/usecases/load-survey-list/remote-load-survey-list'
import apiUrlFactory from 'main/factories/http/api-url-factory'
import httpClientFactory from 'main/factories/http/http-client-factory'

export default function remoteLoadSurveyListFactory(): RemoteLoadSurveyList {
  return new RemoteLoadSurveyList(
    apiUrlFactory('/surveys'),
    httpClientFactory()
  )
}
