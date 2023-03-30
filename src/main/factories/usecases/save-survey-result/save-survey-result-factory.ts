import { RemoteSaveSurveyResult } from 'data/usecases/remote-save-survey-result/remote-save-survey-result'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'
import { authHttpClientDecoratorFactory } from 'main/factories/decorators/auth-http-client-decorator-factory'
import apiUrlFactory from 'main/factories/http/api-url-factory'

export default function remoteSaveSurveyResultFactory(
  id: string
): SaveSurveyResult {
  return new RemoteSaveSurveyResult(
    apiUrlFactory(`/surveys/${id}/results`),
    authHttpClientDecoratorFactory()
  )
}
