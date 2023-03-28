export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Answer = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }

  export type Model = {
    question: string
    answers: LoadSurveyResult.Answer[]
    date: Date
    didAnswer: boolean
  }
}
