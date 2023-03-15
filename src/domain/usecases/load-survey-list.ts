export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type Answer = {
    image?: string
    answer: string
  }

  export type Model = {
    id: string
    question: string
    answers: LoadSurveyList.Answer[]
    date: Date
    didAnswer: boolean
  }
}
