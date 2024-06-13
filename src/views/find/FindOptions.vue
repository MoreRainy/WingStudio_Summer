<script setup>
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
</script>

<template>
  <div class="win_options center">
    <div class="win_options_container">
      <ul
        ref="ul"
        :style="{
          left: `${positionX}px`
        }"
        @touchstart="moveIn"
        @touchmove="moveIng"
        @touchend="moveOut"
      >
        <li class="iconfont">&#xe618;<span>每日推荐</span></li>
        <li class="iconfont">&#xe603;<span>私人FM</span></li>
        <li class="iconfont">&#xe626;<span>歌单</span></li>
        <li class="iconfont">&#xe613;<span>排行榜</span></li>
        <li class="iconfont">&#xe61d;<span>有声书</span></li>
        <li class="iconfont">&#xe62b;<span>数字专辑</span></li>
        <li class="iconfont">&#xe628;<span>关注新歌</span></li>
        <li class="iconfont">&#xe62a;<span>妙时</span></li>
        <li class="iconfont">&#xe60b;<span>收藏家</span></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.win_options {
  width: 100%;
  height: 1.2rem; //60px
  margin-top: 0.3rem; //15px

  .win_options_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    ul {
      display: flex;
      justify-content: space-around;
      width: 180%;
      height: 100%;
      position: absolute;

      li {
        display: flex;
        flex-direction: column;
        font-size: 0.8rem; //40px

        span {
          display: block;
          margin-top: 0.06rem; //3px
          height: 100%;
          width: 100%;
          font-size: 0.2rem; //10px
        }
      }
    }
  }
}
</style>
