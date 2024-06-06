<script setup>
import { onMounted } from 'vue'
import { getKey } from '@/api/login.js'
import { useLoginStore } from '@/stores/modules/login.js'
import { storeToRefs } from 'pinia'

const loginStore = useLoginStore()
const { picBase64 } = storeToRefs(loginStore)

//初始化获取二维码
onMounted(getKey)
</script>

<template>
  <div class="win_login">
    <header><h1>登录</h1></header>
    <img src="../../assets/logo.jpg" alt="logo" class="logo" />
    <img alt="QRCode" @click="getKey" class="QRCode" :src="picBase64" />
    <p class="message">{{ loginStore.picStatus }}-{{ loginStore.picMsg }}</p>
    <div class="visitor">游客登录</div>
  </div>
</template>

<style scoped lang="less">
.win_login {
  width: 900px;
  height: 100vh;
  background-color: #f5f5f5;
  // background-color: red;
  margin: 0 auto;
  text-align: center;

  img {
    display: block;
    margin: 50px auto;
  }

  .logo {
    width: 100px;
    border-radius: 20px;
  }

  .QRCode {
    width: 200px;
    height: 200px;
  }

  .visitor {
    background-color: skyblue;
    width: 60%;
    height: 50px;
    margin: 0 auto;
    font-size: 18px;
    border-radius: 25px;
    line-height: 50px;
  }
}
</style>
