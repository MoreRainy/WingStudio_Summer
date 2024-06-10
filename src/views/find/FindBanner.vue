<script setup>
import { findBanner } from '@/api/findPage'
import { onMounted, ref } from 'vue'

let banners = ref({}) //对象：接收轮播图图片url
let banners_num = ref() //数字：用于渲染轮播图数量
//获取设备数据（应该封装到仓库）
let deviceWidth = ref(document.documentElement.clientWidth || window.innerWidth)
let deviceHeight = ref(deviceWidth.value * 0.32)

//获取banner
onMounted(async () => {
  const data = await findBanner()
  banners.value = data.data.banners
  banners_num.value = Object.keys(banners.value).length
})
</script>

<template>
  <div
    class="win_banner center"
    :style="{ width: `${deviceWidth}px`, height: `${deviceHeight}px` }"
  >
    <div class="win_banner_container">
      <ul :style="`width: ${100 * banners_num}%`">
        <li
          v-for="(value, pic) in banners"
          :key="pic"
          :style="{
            backgroundImage: `url(${value.pic}?param=${deviceWidth - 20}y${deviceHeight})`,
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

      li {
        height: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
