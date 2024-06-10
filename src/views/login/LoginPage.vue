<script setup>
import { onMounted, watch, ref } from 'vue'
import { getKey, getVisitor } from '@/api/login.js'
import { useLoginStore } from '@/stores/modules/loginStore.js'
import { useUserStore } from '@/stores/modules/userStore.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const userStore = useUserStore()
const { picStatus } = storeToRefs(loginStore)
const { isVisitor, userCookie } = storeToRefs(userStore)
const router = useRouter()
let tips = ref('')

//初始化：获取二维码
onMounted(getKey)

//初始化：清空Cookie和游客状态
onMounted(() => {
  console.log('test')
  userStore.setIsVisitor(false)
  userStore.setUserCookie('')
})

//方法：跳转主页
const back = () => {
  router.push('/')
}

//监听：登录状态
watch([picStatus, isVisitor, userCookie], () => {
  if (picStatus.value === 803 || (isVisitor.value && userCookie.value)) {
    back()
  }
  if (isVisitor.value && !userCookie.value) {
    tips.value = '登录失败'
  }
})
</script>

<template>
  <div class="win_login center">
    <header><h1>登录</h1></header>
    <img src="../../assets/logo.jpg" alt="logo" class="logo" />
    <img
      alt="QRCode"
      @click="getKey"
      class="QRCode"
      :src="loginStore.picBase64"
    />
    <p class="message">{{ loginStore.picStatus }}-{{ loginStore.picMsg }}</p>
    <div class="visitor" @click="getVisitor">游客登录</div>
    <p class="tip">{{ tips }}</p>
  </div>
</template>

<style scoped lang="less">
.win_login {
  height: 100vh;
  background-color: #f5f5f5;
  // background-color: red;
  margin: 0 auto;
  text-align: center;
  font-size: 0.6rem;
  // font-size: 18 / 50rem;

  img {
    display: block;
    margin: 1rem auto;
  }

  .logo {
    width: 2rem;
    border-radius: 0.4rem;
  }

  .QRCode {
    width: 4rem;
    height: 4rem;
  }

  .visitor {
    background-color: skyblue;
    width: 60%;
    height: 1rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    line-height: 1rem;
  }
  .tip {
    color: red;
  }
}
</style>
