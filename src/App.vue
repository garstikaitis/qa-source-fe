<template>
  <div id="app" class="font-display">
    <router-view/>
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

$--color-primary: #6C63FF;
$--color-secondary: #6BC83D;

.w-min-content {
  width: min-content;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-loading-spinner {
  display: flex;
  justify-content: center;
}
</style>
