import { type HttpClient } from 'data/protocols/http'
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
    await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as RemoteSaveSurveyResult.Model
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = SurveyResultModel
}
