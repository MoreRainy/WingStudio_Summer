import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore(
  'device',
  () => {
    const deviceWidth = ref()

    return {
      deviceWidth
    }
  }
  //   ,
  //   {
  //     persist: true
  //   }
)
