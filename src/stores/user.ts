import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: { name: '', scores: 0 } as { name: string; scores: number }
  }),

  getters: {
    getUserInfo(state) {
      return state.user
    }
  },
  actions: {
    setUser(user: { name: string; scores: number }) {
      this.user = user
    },
    clearUserStore() {
      this.$reset()
      toast.success('Log out Successfully!')
    }
  }
})
