import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userUid = ref('')
    const setUserUid = (msg) => {
      userUid.value = msg
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
      userUid,
      setUserUid,
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
