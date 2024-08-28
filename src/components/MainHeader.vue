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
import { LogInIcon, LogOutIcon, LogsIcon } from 'lucide-vue-next';

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
        <DropdownMenuTrigger class="hover:text-primary">Hi, {{ userName }}! 👋</DropdownMenuTrigger>
        <DropdownMenuContent>
          <RouterLink to="/logs" class="group">
            <DropdownMenuItem>
              <LogsIcon class="mr-2 h-4 w-4 group-hover:text-primary" />
              <span>My Logs</span>
            </DropdownMenuItem>
          </RouterLink>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="store.clearUserStore" class="group">
            <LogOutIcon class="mr-2 h-4 w-4 group-hover:text-primary" />
            <span> Sign Off</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RouterLink v-else to="/signin" class="flex justify-center items-center group">
        <LogInIcon class="mr-2 h-4 w-4 group-hover:text-primary" />
        Sign In
      </RouterLink>
    </nav>
  </header>
</template>
