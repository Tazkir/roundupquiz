<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <Toaster position="bottom-right" rich-colors />
    <MainHeader />
    <RouterView class="flex-grow flex-1" />
    <MainFooter />
  </main>
</template>
