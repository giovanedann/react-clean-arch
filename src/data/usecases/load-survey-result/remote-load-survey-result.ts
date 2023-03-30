import { HttpStatusCode, type HttpClient } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type LoadSurveyResult } from 'domain/usecases/load-survey-result'

export class RemoteLoadSurveyResult implements RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.request({
      method: 'get',
      url: this.url
    })

    const surveyResult = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!surveyResult) {
          throw new UnexpectedError()
        }
        return {
          ...surveyResult,
          date: new Date(surveyResult.date)
        }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.serverError:
        throw new UnexpectedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Answer = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }

  export type Model = {
    question: string
    date: string
    didAnswer: boolean
    answers: RemoteLoadSurveyResult.Answer[]
  }
}
