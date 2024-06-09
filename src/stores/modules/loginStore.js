import { defineStore } from 'pinia'
import { ref } from 'vue'
import loading from '@/assets/loading.jpg'

export const useLoginStore = defineStore(
  'login',
  () => {
    const picKey = ref('')
    const setPicKey = (msg) => {
      picKey.value = msg
    }
    const picBase64 = ref(loading)
    const setPicBase64 = (msg) => {
      picBase64.value = msg
    }
    const picStatus = ref('')
    const setPicStatus = (msg) => {
      picStatus.value = msg
    }
    const picMsg = ref('')
    const setPicMsg = (msg) => {
      picMsg.value = msg
    }

    return {
      picKey,
      setPicKey,
      picBase64,
      setPicBase64,
      picStatus,
      setPicStatus,
      picMsg,
      setPicMsg
    }
  },
  {
    persist: true
  }
)
