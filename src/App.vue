<script>
import { defineComponent } from 'vue'
import MySliderComponent from './components/MySliderComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    MySliderComponent,
  },
})
</script>

<template>
  <div id="app">
    <img src="@/assets/logo.svg" alt="Vite logo" />
    <MySliderComponent />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
