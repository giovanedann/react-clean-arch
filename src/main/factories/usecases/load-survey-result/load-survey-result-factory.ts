import { RemoteLoadSurveyResult } from 'data/usecases/load-survey-result/remote-load-survey-result'
import { authHttpClientDecoratorFactory } from 'main/factories/decorators/auth-http-client-decorator-factory'
import apiUrlFactory from 'main/factories/http/api-url-factory'

export default function remoteLoadSurveyResultFactory(
  id: string
): RemoteLoadSurveyResult {
  return new RemoteLoadSurveyResult(
    apiUrlFactory(`/surveys/${id}/results`),
    authHttpClientDecoratorFactory()
  )
}
