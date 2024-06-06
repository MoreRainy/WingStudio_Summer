import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const uid = ref('test')
    const setUid = (newUid) => {
      uid.value = newUid
    }
    return {
      uid,
      setUid
    }
  },
  {
    persist: true
  }
)
