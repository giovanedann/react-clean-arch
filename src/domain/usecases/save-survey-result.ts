import { type SurveyResultModel } from 'domain/models/survey-result'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  }

  export type Model = SurveyResultModel
}
