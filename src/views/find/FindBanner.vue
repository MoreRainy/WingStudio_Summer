<script setup>
import { findBanner } from '@/api/findPage'
import { onMounted, onUnmounted, ref, watch } from 'vue'

let banners = ref({}) //对象：接收轮播图图片url
let banners_num = ref() //数字：用于渲染轮播图数量

let picCurrent = ref(0) //数组：记录当前轮播图,默认0，为数组第一张图片
let picPosition = ref('translateX(0px)') //字符串：代表ul位置，直接使用模板字符串修改translate享受不了响应式

//获取设备数据（应该封装到仓库）
let deviceWidth = ref(document.documentElement.clientWidth || window.innerWidth)
let picWidth = ref(deviceWidth.value - 40)
let picHeight = ref(picWidth.value * 0.35)

//获取banner
onMounted(async () => {
  const data = await findBanner()
  banners.value = data.data.banners
  banners_num.value = Object.keys(banners.value).length
})

//轮播图
let startX = ref(0) //获取初始落点
let moveX = ref(0) //计算移动距离
let timer = ref() //申明定时器
//注册定时器函数 5s轮换
const setTimer = () => {
  timer.value = setInterval(() => {
    picCurrent.value += 1
  }, 50000)
}
//清除定时器函数
const clearTimer = () => {
  clearInterval(timer.value)
  timer.value = null
}
//自动轮播 5s
onMounted(setTimer)
//关闭页面卸载定时器
onUnmounted(clearTimer)
//获取初试落点
const moveIn = (e) => {
  startX.value = e.targetTouches[0].pageX
  clearTimer()
}
//移动跟随
const moveIng = (e) => {
  moveX.value = e.targetTouches[0].pageX - startX.value
}
//判读是否拉动足够的距离（30%）
const moveOut = () => {
  if (Math.abs(moveX.value) > picWidth.value * 0.3) {
    picCurrent.value -= moveX.value / Math.abs(moveX.value)
  }
  moveX.value = 0 //清空
  setTimer()
}
//监视变化
//解释：template中使用translateX会报错，故使用模板字符串
watch([picCurrent, moveX], () => {
  // console.log(picCurrent.value, banners_num.value)
  if (picCurrent.value >= banners_num.value) {
    picCurrent.value = 0
  } else if (picCurrent.value < 0) {
    picCurrent.value = banners_num.value - 1
  }
  picPosition.value = `translateX(${-picCurrent.value * picWidth.value + moveX.value}px)`
})
</script>

<template>
  <div
    class="win_banner center"
    :style="{ width: `${deviceWidth}px`, height: `${picHeight}px` }"
  >
    <div class="win_banner_container">
      <ul
        :style="{
          width: `${100 * banners_num}%`,
          transform: picPosition
        }"
        @touchstart="moveIn"
        @touchmove="moveIng"
        @touchend="moveOut"
      >
        <li
          v-for="(value, pic) in banners"
          :key="pic"
          :style="{
            backgroundImage: `url(${value.pic}?param=${picWidth}y${picHeight})`,
            width: `${100 / banners_num}%`
          }"
        ></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.win_banner {
  margin-top: 15px;

  .win_banner_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;

    ul {
      display: flex;
      height: 100%;
      overflow: hidden;
      transition: all 0.05s ease;

      li {
        height: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
