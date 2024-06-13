//滑动模块
//可重复使用,注意事项：给ul绑定三个事件@touchstart="moveIn" @touchmove="moveIng" @touchend="moveOut"
import { ref, watch, onMounted } from 'vue'
import { useDeviceStore } from '@/stores/modules/deviceStore'

const deviceStore = useDeviceStore()

let positionX = ref(0) //实时移动坐标
let recordX = ref(0) //记录坐标
let startX = ref(0)
let moveX = ref(0)

//获取元素宽度
const ul = ref(null)
let deviceWidth = deviceStore.deviceWidth
let devicePadding = deviceStore.devicePadding
let elementWidth = ref()
onMounted(() => {
  elementWidth.value = ul.value.offsetWidth
})

//获取初始落点
const moveIn = (e) => {
  startX.value = e.targetTouches[0].pageX
}

//移动
const moveIng = (e) => {
  moveX.value = e.targetTouches[0].pageX - startX.value
}

//结束移动
const moveOut = () => {
  recordX.value = positionX.value
}

//跟随
watch(moveX, () => {
  positionX.value = recordX.value + moveX.value

  //防越界
  if (positionX.value > 0) {
    positionX.value = 0
  } else if (
    positionX.value <
    -1 * elementWidth.value + (deviceWidth + devicePadding)
  ) {
    positionX.value = -1 * elementWidth.value + (deviceWidth + devicePadding)
  }
})
