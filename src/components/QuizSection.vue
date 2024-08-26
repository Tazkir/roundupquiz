<script setup lang="ts">
import { useQuestionStore } from '@/stores/question'
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from './ui/button/Button.vue'
import { RotateCcw } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const store = useQuestionStore()
const userStore = useUserStore()

const questionId = ref(Number(route.params.id))
const selectedAnswer = ref('')
const isQuizCompleted = ref(false)

const question = computed(() => store.getQuestions.find((q) => q.id === questionId.value))

const formatOptions = computed(() => {
  return question.value ? Object.values(question.value.options) : []
})

// Watch for changes to save the answer
watch(selectedAnswer, (newValue) => {
  if (question.value) {
    store.saveAnswer(question.value.id, newValue)
  }
})

// Watch for route changes to update the questionId
watch(
  () => route.params.id,
  (newId) => {
    questionId.value = Number(newId)
    selectedAnswer.value = store.getAnswer(questionId.value) || ''
    checkQuizCompletion()
  }
)

// Ensure the default answer is set if navigating back or refreshing
onMounted(() => {
  selectedAnswer.value = store.getAnswer(questionId.value) || ''
  checkQuizCompletion()
})

function checkQuizCompletion() {
  const nextId = questionId.value + 1
  const nextQuestion = store.getQuestions.find((q) => q.id === nextId)
  isQuizCompleted.value = !nextQuestion
}

function nextQuestion() {
  if (selectedAnswer.value) {
    store.saveAnswer(questionId.value, selectedAnswer.value)
    if (isQuizCompleted.value) {
      if (!userStore.getUserInfo.name) {
        router.push(`/signin?redirect=quiz&question=${questionId.value}`)
      } else {
        toast.success('Quiz Completed!')
        router.push('/scores')
      }
    } else {
      const nextId = questionId.value + 1
      router.push(`/quiz/${nextId}`)
    }
  }
}

function resetCurrentAnswer() {
  if (question.value) {
    store.resetAnswer(question.value.id)
    selectedAnswer.value = ''
  }
}
</script>

<template>
  <section class="w-full flex flex-col items-center gap-10 p-10">
    <h1 class="text-5xl text-center font-bold">Rounding Off the Nearest 10</h1>
    <div
      v-if="question"
      class="flex flex-col gap-10 justify-end items-center p-10 shadow-lg rounded-xl bg-gray-300/10"
    >
      <h2 class="text-3xl font-semibold text-center">{{ question.question }}</h2>
      <div class="flex xl:flex-row flex-col gap-5 justify-center items-center">
        <div
          class="shadow-lg rounded-xl flex gap-3 px-10 py-5"
          v-for="(option, key) in formatOptions"
          :key="key"
        >
          <label class="text-xl">
            <input
              type="radio"
              :name="`question-${question.id}`"
              :value="option"
              v-model="selectedAnswer"
            />
            {{ option }}
          </label>
        </div>

        <Button variant="ghost" @click="resetCurrentAnswer">
          <RotateCcw class="w-4 h-4" />
        </Button>
      </div>

      <Button class="w-full" v-if="isQuizCompleted" @click="nextQuestion">
        Submit and Calculate my scores
      </Button>

      <Button class="w-full" v-else @click="nextQuestion" :disabled="!selectedAnswer">
        Next Question
      </Button>
    </div>
  </section>
</template>
