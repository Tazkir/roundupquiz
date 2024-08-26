<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { RouterLink } from 'vue-router'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="font-semibold text-base" size="lg"> Let's Get Started </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-2xl">Reminder</DialogTitle>
        <DialogDescription class="text-base">
          Make sure to answer every question. Click next question when selected one answer.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="w-full flex items-center">
        <RouterLink to="/quiz/1">
          <Button class="font-semibold text-base" size="lg">Got It.</Button>
        </RouterLink>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
