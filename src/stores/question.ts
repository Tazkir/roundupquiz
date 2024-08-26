import { defineStore } from 'pinia'
import type { QuestionOptions } from '@/utils/interfaces'
import { questions } from '@/utils/data'

export const useQuestionStore = defineStore('questions', {
  state: () => ({
    questions: [] as QuestionOptions[],
    answers: {} as { [key: number]: string }
  }),
  getters: {
    getQuestions(state) {
      return state.questions
    },
    getAnswer: (state) => (id: number) => {
      return state.answers[id] || ''
    }
  },
  actions: {
    initializeQuestions() {
      this.questions = questions
    },
    saveAnswer(id: number, answer: string) {
      this.answers[id] = answer
    },
    resetAnswer(id: number) {
      if (this.answers[id]) {
        delete this.answers[id]
      }
    },
    resetQuestions() {
      this.answers = {}
    }
  }
})
