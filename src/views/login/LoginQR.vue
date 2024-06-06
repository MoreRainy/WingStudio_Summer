<script setup>
import request from '@/utils/request.js'
import { ref } from 'vue'
let picCode = ref('qrimg')

const getKey = async () => {
  try {
    request
      .get('/login/qr/key')
      .then((result) => {
        const picKey = result.data.data.unikey
        // return request.get(`/login/qr/create?key=${picKey}`)
        return request.get('/login/qr/create', {
          params: { key: picKey, qrimg: 'qrimg' }
        })
      })
      .then((result) => {
        picCode.value = result.data.data.qrimg
        console.log(picCode.value)
      })
  } catch (error) {
    console.error('获取二维码失败:', error)
  }
}
</script>

<template>
  <button @click="getKey">获取二维码</button>
  <img :src="picCode" />
</template>
