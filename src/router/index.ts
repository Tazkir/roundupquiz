import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import QuizView from '@/views/QuizView.vue'
import ScoresView from '@/views/ScoresView.vue'
import LogsView from '@/views/LogsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  },
  {
    path: '/quiz/:id',
    name: 'quiz',
    component: QuizView
  },
  {
    path: '/scores',
    name: 'scores',
    component: ScoresView
  },
  {
    path: '/logs',
    name: 'logs',
    component: LogsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && from.path.startsWith('/quiz')) {
    next(false)
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/logs' && from.path.startsWith('/quiz')) {
    next(false)
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/quiz/12' && from.path.startsWith('/scores')) {
    next(false)
  } else {
    next()
  }
})

export default router
