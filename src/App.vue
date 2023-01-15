<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  created() {
    const isLight = localStorage.getItem("isLight") === 'false' ? true : false
    this.$store.dispatch("displayModel/changeModel", isLight)
    const theme = localStorage.getItem("theme")
    window.document.documentElement.setAttribute("data-theme", theme);
  }
}
</script>
<style>
#app, html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
</style>
