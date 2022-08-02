<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import VueSlider from 'vue-slider-component'
//import 'vue-slider-component/theme/default.css'

@Component({
  components: {
    VueSlider,
  },
})
export default class MySliderComponent extends Vue {
  value = 50

  created() {
    console.log('MySliderComponent.vue')
  }
}
</script>

<template>
  <div class="example">
    <h3>MySliderComponent.vue</h3>
    <vue-slider v-model="value"></vue-slider>

    <p>See file comments in <code>src/components/MySliderComponent.vue</code></p>
  </div>
</template>

<style lang="scss">
@import 'vue-slider-component/lib/theme/antd.scss';

.example {
  border: 1px solid red;
  padding: 1rem;
  border-radius: 1rem;
  text-align: left;
}
code {
  background: #eee;
  padding: 5px;
}
</style>
