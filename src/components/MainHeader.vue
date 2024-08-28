<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const store = useUserStore()

const userName = ref('')

watch(
  () => store.getUserInfo.name,
  (name) => {
    if (name) {
      userName.value = name.charAt(0).toUpperCase() + name.slice(1)
    } else {
      userName.value = ''
    }
  },
  { immediate: true }
)
</script>

<template>
  <header class="w-full flex justify-between items-center px-10 h-16 shadow-md bg-gray-300/10">
    <RouterLink to="/">
      <img alt="Vue logo" class="w-10 h-10" src="@/assets/logo.svg" width="125" height="125" />
    </RouterLink>

    <nav class="flex gap-5">
      <RouterLink to="/">Home</RouterLink>

      <DropdownMenu v-if="store.getUserInfo.name">
        <DropdownMenuTrigger>Welcome, {{ userName }}!</DropdownMenuTrigger>
        <DropdownMenuContent>
          <RouterLink to="/logs">
            <DropdownMenuItem>My Logs</DropdownMenuItem>
          </RouterLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="store.clearUserStore">Sign Off</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RouterLink v-else to="/signin">Sign In</RouterLink>
    </nav>
  </header>
</template>
