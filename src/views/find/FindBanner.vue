<script setup>
import { findBanner } from '@/api/findPage'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useDeviceStore } from '@/stores/modules/deviceStore'
import { storeToRefs } from 'pinia'

let banners = ref({}) //对象：接收轮播图图片url
let banners_num = ref() //数字：用于渲染轮播图数量
//模板字符串遇到对象会自动转换为字符串，结果显示[object Object]
let banners_first = ref('first') //字符串：作为无缝切换的克隆对象
let banners_last = ref('last') //字符串：作为无缝切换的克隆对象

let picCurrent = ref(1) //数组：记录当前轮播图,默认1，为数组第一张图片
let picPosition = ref() //数字：表示图片位置

let transitionFlag = ref(1) //判断是否执行过渡，1执行过渡，0不执行过渡

//获取设备数据（应该封装到仓库）
const deviceStore = useDeviceStore()
const { deviceWidth } = storeToRefs(deviceStore)

//计算banner图片数据
let picWidth = ref(deviceWidth.value - 40)
let picHeight = ref(picWidth.value * 0.35)

//在此处自定义
//设置轮播图自动轮播时间间隔，单位ms
const timeLag = 5000
//设置过渡时间，单位s
const transitionLag = 0.5
//设置手动划动轮播图切换的阈值
const clipLag = 0.2

//轮播图初始值
picPosition.value = -picCurrent.value * picWidth.value

//动画函数
const ul = ref(null)
let clearTransition
let setTransition
onMounted(() => {
  //清除动画函数，用于无缝衔接
  clearTransition = () => {
    ul.value.style.transition = 'none'
  }
  //设置动画函数
  setTransition = () => {
    ul.value.style.transition = `all ${transitionLag}s ease`
  }
})
//获取banner
onMounted(async () => {
  const data = await findBanner()
  banners.value = data.data.banners //数组：获取数据
  banners_num.value = Object.keys(banners.value).length //数字：获取轮播图总图片数量
  banners_first.value = banners.value[0].pic //第一张图片，克隆到最后
  banners_last.value = banners.value[banners_num.value - 1].pic //最后一张图片，克隆到最前
  banners_num.value += 2 //包含前后两张无缝切换克隆图
})

//自动轮播
let startX = ref(0) //获取初始落点
let moveX = ref(0) //计算移动距离
let timer = ref() //申明定时器
let recordX = ref(0) //用于记录上次滑动距离，用于恢复过渡未完成再次点击的距离，以防闪现
//对recordX的补充说明：①他用于记录最后一次手动操作轮播图的位移
//②若发生过渡未完成而再次点击，判定为前一次未中断的连续点击，他将用于恢复上一次的操作状态
//③恢复状态后，他将修改为本次初始状态，避免两次点击期间因过渡产生的位移的影响

//注册定时器函数
const setTimer = () => {
  timer.value = setInterval(() => {
    transitionFlag.value = 1
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
//该函数表示轮播图切换（过渡）彻底完成，清除相关旗帜变量
const bannerChange = () => {
  recordX.value = 0 //过渡完成，表示没有连续滑动轮播图，可清除
  //无缝切换处理
  if (picCurrent.value === banners_num.value - 1) {
    transitionFlag.value = 0 //不能添加动画，因为要瞬时完成
    picCurrent.value = 1 //暗地里切换图片位置，实现无缝切换
  } else if (picCurrent.value === 0) {
    transitionFlag.value = 0
    picCurrent.value = banners_num.value - 2
  }
}

//获取初始落点
const moveIn = (e) => {
  startX.value = e.targetTouches[0].pageX
  if (recordX.value) {
    //如果切图了，复原
    if (Math.abs(recordX.value) > picWidth.value * clipLag) {
      picCurrent.value +=
        (recordX.value / Math.abs(recordX.value)) *
        Math.floor(
          (Math.abs(recordX.value) - picWidth.value * clipLag) /
            picWidth.value +
            1
        )
    }
    //过渡未结束就点击，更改起始位置
    const newPosition =
      document.querySelector('ul').offsetLeft +
      picCurrent.value * picWidth.value
    recordX.value = newPosition //修改记录点到起始位置
    moveX.value = newPosition //更改起始位置
  }
  transitionFlag.value = 0 //禁用过渡标识，不然轮播图会不跟手，延迟！
  clearTimer() //禁用自动轮播
  clearTransition() //清除过渡
}

//移动跟随
const moveIng = (e) => {
  if (recordX.value) {
    moveX.value = e.targetTouches[0].pageX - startX.value + recordX.value
  } else {
    moveX.value = e.targetTouches[0].pageX - startX.value
  }
}

const moveOut = () => {
  transitionFlag.value = 1
  //判读是否拉动足够的距离（clipLag）
  if (Math.abs(moveX.value) > picWidth.value * clipLag) {
    //用户一次可以滑过多个轮播图
    //这段代码为复杂版，原用于处理一次划过多张图，但兼容一次划一张
    //头真疼吧，这串代码达到了想要的预期，但是不知道该如何写注释，我很怀疑以后还看不看得懂
    picCurrent.value -=
      (moveX.value / Math.abs(moveX.value)) *
      Math.floor(
        (Math.abs(moveX.value) - picWidth.value * clipLag) / picWidth.value + 1
      )
  }
  recordX.value = moveX.value //记录最后的距离
  //特殊情况：上一次操作手动将轮播图完全切换，将不会触发transition过渡，手动清空recordX
  if (Math.abs(moveX.value) === picWidth.value) {
    bannerChange()
  }
  moveX.value = 0 //清空,此处清空moveX可达到回滚效果
  setTimer()
}

//解释：template中使用translateX会报错，故使用模板字符串
watch([picCurrent, moveX], () => {
  //可用动画的情况：滑动不足30%回滚，滑动超过30%切图，
  //不可用动画的情况：无缝衔接的切换，手指滑动轮播图
  if (transitionFlag.value) {
    setTransition()
  } else {
    clearTransition()
  }
  picPosition.value = -picCurrent.value * picWidth.value + moveX.value
  // if (picPosition.value > 0) {
  //   picPosition.value = 0
  // } else if (
  //   picPosition.value <
  //   -1 * (banners_num.value - 1) * picWidth.value
  // ) {
  //   picPosition.value = -1 * (banners_num.value - 1) * picWidth.value
  // }
  //限制每次只能移动到左右两张图片
  if (Math.abs(moveX.value) > picWidth.value) {
    moveX.value = (moveX.value / Math.abs(moveX.value)) * picWidth.value
  }
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
          left: `${picPosition}px`
        }"
        @touchstart="moveIn"
        @touchmove="moveIng"
        @touchend="moveOut"
        @transitionend="bannerChange"
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
    position: relative;

    ul {
      display: flex;
      height: 100%;
      overflow: hidden;
      transition: none;
      position: absolute;

      li {
        height: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
