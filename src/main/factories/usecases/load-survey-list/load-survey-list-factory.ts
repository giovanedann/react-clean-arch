import { RemoteLoadSurveyList } from 'data/usecases/load-survey-list/remote-load-survey-list'
import { authHttpClientDecoratorFactory } from 'main/factories/decorators/auth-http-client-decorator-factory'
import apiUrlFactory from 'main/factories/http/api-url-factory'

export default function remoteLoadSurveyListFactory(): RemoteLoadSurveyList {
  return new RemoteLoadSurveyList(
    apiUrlFactory('/surveys'),
    authHttpClientDecoratorFactory()
  )
}
