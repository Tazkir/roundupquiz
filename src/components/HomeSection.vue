<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Button from './ui/button/Button.vue'
import { RouterLink } from 'vue-router'
import ConfirmQuizDialog from './ConfirmQuizDialog.vue'
import HighScores from './HighScores.vue'

const store = useUserStore()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-10 p-10">
    <div class="flex flex-col gap-3 justify-center items-center text-center">
      <h1 class="xl:text-7xl text-5xl text-center text-primary font-semibold">
        Put Your Rounded Math Skills to the Test!
      </h1>
      <p class="text-gray-400 xl:text-xl text-base">
        Test your rounded math skills with our interactive challenge. Click "Let's Get Started" to
        begin, or "Sign In" to track your progress!
      </p>
    </div>

    <div class="flex gap-5">
      <ConfirmQuizDialog />
      <RouterLink v-if="!store.getUserInfo.name" to="/signin">
        <Button class="font-semibold text-base" variant="outline" size="lg">Sign In</Button>
      </RouterLink>
    </div>

    <HighScores />
  </div>
</template>
