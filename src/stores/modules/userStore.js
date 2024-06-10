import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    //记录用户id
    const userId = ref('')
    const setUserId = (msg) => {
      userId.value = msg
    }
    //记录用户cookie
    const userCookie = ref('')
    const setUserCookie = (msg) => {
      userCookie.value = msg
    }
    //记录游客状态
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
