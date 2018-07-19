<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <div id="time-range-container">
      <p>Time is: {{ time | formatTime }}</p>
      <div id="time-range-slider"></div>
    </div>
  </div>
</template>

<script>

import noUiSlider from 'nouislider';

export default {
  data: function() {
    return {
      time: 900
    }
  },
  filters: {
    formatTime: function(value) {

      return value/100 + ":00";

    }
  },
  mounted: function() {

    var component = this;

    var range = document.getElementById('time-range-slider');

    var slider = noUiSlider.create(range, {
      range: {
        min: 0,
        max: 2300
      },
      step: 100,
      start: component.time
    });

    slider.on('update', function(values) {

      component.time = values[0];

    });

  }
};

</script>

<style lang="scss">

@import './assets/reset.scss';

@import '../node_modules/nouislider/distribute/nouislider.css';

strong, b {
  font-weight: bold;
}

#nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
  height: 1.5rem;
  background: white;
  border-radius: 0 0 0 1rem;
  z-index: 1001;
}

#time-range-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 20rem;
  height: 4rem;
  margin-left: -10rem;
  background: white;
  z-index: 1001;
  border-radius: 1rem 1rem 0 0;
  #time-range-slider {
    width: 18rem;
    margin: 1rem auto;
  }
}

</style>
