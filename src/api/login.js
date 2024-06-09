import request from '@/utils/request.js'
import { useLoginStore } from '@/stores/modules/loginStore.js'
import { useUserStore } from '@/stores/modules/userStore.js'

import loading from '@/assets/loading.jpg'

const loginStore = useLoginStore()
const userStore = useUserStore()
let timer
const clearTimer = () => {
  clearInterval(timer)
  timer = null
}

//获取二维码
export const getKey = async () => {
  try {
    request
      .get('/login/qr/key', { params: { timeStamp: +new Date() } })
      .then((result) => {
        loginStore.setPicKey(result.data.data.unikey) //修改二维码代表的key
        //二维码接口
        return request.get('/login/qr/create', {
          params: { key: loginStore.picKey, qrimg: 'qrimg' }
        })
      })
      .then((result) => {
        //清除上一个定时器
        if (timer) {
          clearTimer()
        }
        //变更二维码
        loginStore.setPicBase64(result.data.data.qrimg)
        //持续获取二维码状态
        timer = setInterval(async () => {
          //轮询二维码状态
          request
            .get('/login/qr/check', {
              params: { key: loginStore.picKey, timeStamp: +new Date() }
            })
            .then((result) => {
              loginStore.setPicStatus(result.data.code) //存储状态码
              loginStore.setPicMsg(result.data.message) //存储状态信息
              //800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功、
              //二维码过期
              if (loginStore.picStatus === 800) {
                clearTimer()
                loginStore.setPicBase64(loading) //loading
              }
              //非等待扫码阶段
              if (loginStore.picStatus != 801) {
                loginStore.setPicBase64(loading) //loading
              }
              //授权登录成功
              if (loginStore.picStatus === 803) {
                clearTimer() //清除轮询定时器
                userStore.setUserCookie(result.data.cookie) //修改cookie
                userStore.setIsVisitor(false) //游客身份关闭
                userStore.setUserId(result.data.userId) //修改用户ID
                console.log(result)
              }
            })
        }, 1000)
        //如果路由变化而没有成功注册登录会导致计时器一直运行，需要想办法删除
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
      clearTimer() //清除轮询定时器
      userStore.userCookie = result.data.cookie //修改Cookie
      userStore.setIsVisitor(true) //开启游客身份
      userStore.setUserId(result.data.userId) //修改用户ID
    })
}
