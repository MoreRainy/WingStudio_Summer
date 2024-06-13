import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore(
  'device',
  () => {
    //初始化设备宽度
    const deviceWidth = ref(
      document.documentElement.clientWidth || window.innerWidth
    )
    const setDeviceWidth = (msg) => {
      deviceWidth.value = msg
    }
    const devicePadding = ref(40)

    return {
      deviceWidth,
      setDeviceWidth,
      devicePadding
    }
  }
  //   ,
  //   {
  //     persist: true
  //   }
)
