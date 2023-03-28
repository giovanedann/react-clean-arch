import { RemoteLoadSurveyResult } from 'data/usecases/load-survey-result/remote-load-survey-result'
import { authHttpGetClientDecoratorFactory } from 'main/factories/decorators/auth-http-get-client-decorator-factory'
import apiUrlFactory from 'main/factories/http/api-url-factory'

export default function remoteLoadSurveyResultFactory(
  id: string
): RemoteLoadSurveyResult {
  return new RemoteLoadSurveyResult(
    apiUrlFactory(`/surveys/${id}/results`),
    authHttpGetClientDecoratorFactory()
  )
}
