import { HttpStatusCode, type HttpClient } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type SurveyResultModel } from 'domain/models'
import { type SaveSurveyResult } from 'domain/usecases/save-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(
    params: SaveSurveyResult.Params
  ): Promise<RemoteSaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (httpResponse.body) {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          return {} as RemoteSaveSurveyResult.Model
        }
        throw new UnexpectedError()
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
