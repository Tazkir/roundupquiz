<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import Label from './ui/label/Label.vue'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue-sonner'
import { useRoute, useRouter } from 'vue-router'

const name = ref('')
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

if (userStore.getUserInfo.name) {
  router.push('/')
}

const submitForm = () => {
  if (name.value) {
    userStore.setUser({ name: name.value, scores: 0 })

    toast.success('Sign In Successfully!', {
      description: `Login As: ${name.value}`
    })

    name.value = ''

    const redirectTo = route.query.redirect as string
    const questionId = route.query.question as string

    const redirectUrl = redirectTo && questionId ? `/${redirectTo}/${questionId}` : '/'

    router.push(redirectUrl)
  } else {
    toast.error('Enter the name to submit the scores')
  }
}
</script>

<template>
  <div class="w-full flex items-center justify-center px-10">
    <form @submit.prevent="submitForm">
      <div class="shadow-lg rounded-xl flex flex-col gap-5 px-10 py-5 bg-gray-300/10">
        <div class="w-full flex flex-col justify-center items-center text-center gap-1">
          <h1 class="xl:text-4xl text-3xl font-bold">Sign In</h1>
          <span class="text-gray-400 xl:text-xl md text-lg font-medium"
            >Enter your name to submit the scores</span
          >
        </div>

        <div class="w-full flex flex-col gap-2">
          <Label for="name" class="text-xl font-semibold">Name</Label>
          <Input id="name" type="text" placeholder="Enter your name" v-model="name" />
        </div>

        <Button type="submit" class="font-semibold text-lg">Submit</Button>
      </div>
    </form>
  </div>
</template>
