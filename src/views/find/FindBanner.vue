<script setup>
import { findBanner } from '@/api/findPage'
import { onMounted, onUnmounted, ref, watch } from 'vue'

let banners = ref({}) //对象：接收轮播图图片url
let banners_num = ref() //数字：用于渲染轮播图数量
//模板字符串遇到对象会自动转换为字符串，结果显示[object Object]
let banners_first = ref('first') //字符串：作为无缝切换的克隆对象
let banners_last = ref('last') //字符串：作为无缝切换的克隆对象

let picCurrent = ref(1) //数组：记录当前轮播图,默认1，为数组第一张图片
let picPosition = ref('') //字符串：代表ul位置，直接使用模板字符串修改translate享受不了响应式

let transitionFlag = ref(1) //判断是否执行过渡，1执行过渡，0不执行过渡

//获取设备数据（应该封装到仓库）
let deviceWidth = ref(document.documentElement.clientWidth || window.innerWidth)
let picWidth = ref(deviceWidth.value - 40)
let picHeight = ref(picWidth.value * 0.35)

//设置轮播图自动轮播时间间隔，单位ms
const timeLag = 5000
//设置过渡时间，单位s
const transitionLag = 0.5

//轮播图初始值
picPosition.value = `translateX(${-picCurrent.value * picWidth.value}px)`

//清除动画函数，用于无缝衔接
const clearTransition = () => {
  document.querySelector('ul').style.transition = 'none'
}
//设置动画函数
const setTransition = () => {
  document.querySelector('ul').style.transition = `all ${transitionLag}s ease`
}

//获取banner
onMounted(async () => {
  const data = await findBanner()
  banners.value = data.data.banners
  banners_num.value = Object.keys(banners.value).length
  banners_first.value = banners.value[0].pic
  banners_last.value = banners.value[banners_num.value - 1].pic
  banners_num.value += 2 //包含前后两张无缝切换克隆图
})

//自动轮播
let startX = ref(0) //获取初始落点
let moveX = ref(0) //计算移动距离
let timer = ref() //申明定时器
//注册定时器函数
const setTimer = () => {
  timer.value = setInterval(() => {
    picCurrent.value += 1
  }, timeLag)
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

//移动轮播图
//获取初始落点
const moveIn = (e) => {
  startX.value = e.targetTouches[0].pageX
  transitionFlag.value = 0
  clearTimer()
  clearTransition()
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
  transitionFlag.value = 1
  setTimer()
}
const transitionEnd = () => {
  transitionFlag.value = 1
  clearTransition()
  //无缝切换处理
  if (picCurrent.value === banners_num.value - 1) {
    transitionFlag.value = 0
    picCurrent.value = 1
    setTimeout(() => {
      transitionFlag.value = 1
    }, transitionLag * 1000)
  } else if (picCurrent.value === 0) {
    transitionFlag.value = 0
    picCurrent.value = banners_num.value - 2
    setTimeout(() => {
      transitionFlag.value = 1
    }, transitionLag * 1000)
  }
}
//解释：template中使用translateX会报错，故使用模板字符串
watch([picCurrent, moveX], () => {
  if (transitionFlag.value) {
    setTransition()
  }
  picPosition.value = `translateX(${-picCurrent.value * picWidth.value + moveX.value}px)`
})
</script>

<template>
  <div
    class="win_banner center"
    :style="{ width: `${deviceWidth}px`, height: `${picHeight}px` }"
  >
    <div ref="container" class="win_banner_container">
      <ul
        ref="ul"
        :style="{
          width: `${100 * banners_num}%`,
          transform: picPosition
        }"
        @touchstart="moveIn"
        @touchmove="moveIng"
        @touchend="moveOut"
        @transitionend="transitionEnd"
      >
        <li
          :style="{
            backgroundImage: `url(${banners_last}?param=${picWidth}y${picHeight})`,
            width: `${100 / banners_num}%`
          }"
        ></li>
        <li
          v-for="(value, pic) in banners"
          :key="pic"
          :style="{
            backgroundImage: `url(${value.pic}?param=${picWidth}y${picHeight})`,
            width: `${100 / banners_num}%`
          }"
        ></li>
        <li
          :style="{
            backgroundImage: `url(${banners_first}?param=${picWidth}y${picHeight})`,
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
      transition: none;

      li {
        height: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
