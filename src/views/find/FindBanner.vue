<script setup></script>

<template>
  <div class="win_banner center">
    <div class="win_banner_container">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.win_banner {
  width: 100%;
  height: 100px;
  margin-top: 15px;

  .win_banner_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;

    ul {
      display: flex;
      width: 600%;
      height: 100%;
      background-color: greenyellow;
      overflow: hidden;

      li {
        width: 100%;
        height: 100%;
        background-color: sandybrown;
      }
    }
  }
}
</style>
