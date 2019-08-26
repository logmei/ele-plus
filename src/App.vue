<template>
  <div id="app">
    <exmaples-component/>
  </div>
</template>

<script>
import ExmaplesComponent from './examples/imageExample/images'
export default {
  name: 'app',
  components: {
    ExmaplesComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
