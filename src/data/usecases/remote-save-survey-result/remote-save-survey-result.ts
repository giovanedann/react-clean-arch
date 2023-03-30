import { type RemoteSurveyResultModel } from 'data/models/remote-survey-result'
import { HttpStatusCode, type HttpClient } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type SurveyResultModel } from 'domain/models'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSurveyResultModel>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })

    const updatedSurveyResult = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!updatedSurveyResult) {
          throw new UnexpectedError()
        }

        return {
          ...updatedSurveyResult,
          date: new Date(updatedSurveyResult.date)
        }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = SurveyResultModel
}
