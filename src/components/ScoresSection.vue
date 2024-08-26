<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/user'
import Button from './ui/button/Button.vue'
import { useRouter } from 'vue-router'
import { RefreshCcw } from 'lucide-vue-next'

const store = useQuestionStore()
const userStore = useUserStore()

const router = useRouter()

watch(
  () => userStore.getUserInfo.name,
  (name) => {
    if (!name) {
      router.push('/')
    }
  },
  { immediate: true }
)

// Compute the total score based on user answers
const score = computed(() => {
  return store.getQuestions.reduce((total, question) => {
    const userAnswer = store.getAnswer(question.id)

    if (userAnswer === question.answer) {
      return total + 1
    }
    return total
  }, 0)
})

// Update the user's score in the store
onMounted(() => {
  userStore.setUser({ name: userStore.getUserInfo.name, scores: score.value })
})

// Get all questions with user answers
const questionsWithAnswers = computed(() => {
  return store.getQuestions.map((question) => ({
    ...question,
    userAnswer: store.getAnswer(question.id)
  }))
})

function restartQuiz() {
  store.resetQuestions()
  router.push('/quiz/1')
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center p-10 gap-5">
    <div
      class="flex flex-col justify-center items-center gap-4 bg-gray-300/10 shadow-md rounded-lg px-10 py-5"
    >
      <h1 class="text-3xl font-bold text-center">
        Submit Your Scores To The Internet and Show it on the front page now!
      </h1>
      <Button class="text-lg" size="lg">Submit Now</Button>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-6xl font-bold text-center">{{ userStore.getUserInfo.name }}'s Scores</h1>
      <p class="text-3xl text-center">
        Total Score: {{ score }} / {{ questionsWithAnswers.length }}
      </p>
    </div>

    <div class="px-5 py-4 w-full flex flex-wrap gap-10 justify-center items-center text-center">
      <div
        v-for="question in questionsWithAnswers"
        :key="question.id"
        class="bg-gray-300/10 shadow-md rounded-lg px-5 py-4 flex flex-col gap-3"
      >
        <h2 class="text-xl font-semibold">{{ question.question }}</h2>
        <p
          :class="
            cn(
              'px-2 py-1 rounded-full',
              question.userAnswer !== question.answer ? 'bg-red-400' : 'bg-green-400'
            )
          "
        >
          <strong>Your Answer:</strong> {{ question.userAnswer || 'Not Answered' }}
        </p>

        <p v-if="question.userAnswer !== question.answer" class="text-red-600">
          <strong>Correct Answer:</strong> {{ question.answer }}
        </p>
      </div>
    </div>

    <div class="w-full flex justify-center items-center gap-4">
      <Button class="text-lg" size="lg" @click="restartQuiz">Restart Quiz</Button>
      <RefreshCcw class="w-4 h-4" />
    </div>
  </div>
</template>
