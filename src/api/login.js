import request from '@/utils/request.js'
import { useLoginStore } from '@/stores/modules/login.js'
import { useUserStore } from '@/stores/modules/user.js'

import loading from '@/assets/loading.jpg'

const loginStore = useLoginStore()
const userStore = useUserStore()
let timer

//获取二维码
export const getKey = async () => {
  try {
    request
      .get('/login/qr/key', { params: { timeStamp: +new Date() } })
      .then((result) => {
        loginStore.setPicKey(result.data.data.unikey)
        return request.get('/login/qr/create', {
          params: { key: loginStore.picKey, qrimg: 'qrimg' }
        })
      })
      .then((result) => {
        //清除上一个定时器
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        //变更二维码
        loginStore.setPicBase64(result.data.data.qrimg)
        //持续获取二维码状态
        timer = setInterval(async () => {
          request
            .get('/login/qr/check', {
              params: { key: loginStore.picKey, timeStamp: +new Date() }
            })
            .then((result) => {
              loginStore.setPicStatus(result.data.code) //存储状态码
              loginStore.setPicMsg(result.data.message) //存储状态信息
              //800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
              if (loginStore.picStatus != 801) {
                loginStore.setPicBase64(loading)
              }
              if (loginStore.picStatus === 803) {
                clearInterval(timer)
                timer = null
                userStore.setUserCookie(result.data.cookie)
                userStore.setIsVisitor(false)
              }
            })
        }, 1000)
      })
  } catch (error) {
    console.error('获取二维码失败:', error)
  }
}

//游客登录
export const getVisitor = async () => {
  request
    .get('/register/anonimous', { params: { timeStamp: +new Date() } })
    .then((result) => {
      console.log(result)
      clearInterval(timer)
      timer = null
      userStore.userCookie = result.data.cookie
      userStore.setIsVisitor(true)
    })
}
