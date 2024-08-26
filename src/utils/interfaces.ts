export interface Rounded {
  id: number
  question: string
  answer: string
  options: {
    [key: string]: string
  }
}

export interface QuestionOptions extends Rounded {
  options: {
    [key: string]: string
  }
}
