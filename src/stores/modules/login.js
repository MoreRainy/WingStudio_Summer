import { defineStore } from 'pinia'
import { ref } from 'vue'
import loading from '@/assets/loading.jpg'

export const useLoginStore = defineStore(
  'login',
  () => {
    const picBase64 = ref(loading)
    const picKey = ref('')
    const picStatus = ref('')
    const picMsg = ref('')
    return {
      picKey,
      picBase64,
      picStatus,
      picMsg
    }
  },
  {
    persist: true
  }
)
