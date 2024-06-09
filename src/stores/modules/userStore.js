import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref('')
    const setUserId = (msg) => {
      userId.value = msg
    }
    const userCookie = ref('')
    const setUserCookie = (msg) => {
      userCookie.value = msg
    }
    const isVisitor = ref(false)
    const setIsVisitor = (flag) => {
      isVisitor.value = flag
    }
    return {
      userId,
      setUserId,
      userCookie,
      setUserCookie,
      isVisitor,
      setIsVisitor
    }
  },
  {
    persist: true
  }
)
