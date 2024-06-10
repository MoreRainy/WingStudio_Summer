import request from '@/utils/request.js'

//获取banner
export const findBanner = () =>
  request.get('/banner', {
    params: { type: 1 }
  })
