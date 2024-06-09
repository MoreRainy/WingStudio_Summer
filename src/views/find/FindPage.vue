<script setup>
import FindBanner from '@/views/find/FindBanner.vue'
import FindOptions from '@/views/find/FindOptions.vue'
</script>

<template>
  <div class="win_find">
    <header>占位</header>
    <FindBanner></FindBanner>
    <FindOptions></FindOptions>
    <nav class="center">
      <RouterLink to="/login">
        <div class="win_icon_1"></div>
      </RouterLink>
      <RouterLink to="/login">
        <div class="win_icon_2"></div>
      </RouterLink>
      <RouterLink to="/login">
        <div class="win_icon_3"></div>
      </RouterLink>
      <RouterLink to="/login">
        <div class="win_icon_4"></div>
      </RouterLink>
      <RouterLink to="/login">
        <div class="win_icon_5"></div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="less">
.win_find {
  text-align: center;

  header {
    width: 100vw;
    // height: 13vh;
    height: 50px;
    background-color: skyblue;
    position: relative;
    font-size: 0.5rem;
    top: 0;
    left: 0;
  }

  nav {
    width: 100vw;
    //不建议用vh，高度难以控制
    // height: 13vh;
    height: 80px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    left: 0;

    a {
      height: auto;
    }

    div[class^='win_icon'] {
      background-image: url(../../assets/icon-home.webp);
      background-repeat: no-repeat;
      width: 50px;
      height: 80px;
    }

    .win_icon_1 {
      background-position: -45px -20px;
    }

    .win_icon_2 {
      background-position: -175px -20px;
    }

    .win_icon_3 {
      background-position: -305px -20px;
    }

    .win_icon_4 {
      background-position: -435px -20px;
    }

    .win_icon_5 {
      background-position: -565px -20px;
    }
  }
}
</style>
