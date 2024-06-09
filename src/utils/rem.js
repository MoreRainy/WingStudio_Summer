const remSize = () => {
  //获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

//默认调用一次
remSize()

window.addEventListener('resize', remSize)

export default remSize
