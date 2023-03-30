import { type SurveyResultModel } from 'domain/models/survey-result'

export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel
}
