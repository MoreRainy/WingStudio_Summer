<script setup></script>

<template>
  <div class="win_options center">
    <div class="win_options_container">
      <ul>
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

    ul {
      display: flex;
      justify-content: space-around;
      width: 180%;
      height: 100%;

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
