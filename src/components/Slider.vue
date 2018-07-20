<template>
  <div id="time-range-container">
    <p>Time is: {{ time | formatTime }}</p>
    <div id="time-range-slider"></div>
  </div>
</template> 

<script>

import noUiSlider from 'nouislider';

import EventBus from '@/event-bus.js';

export default {
  name: 'Slider',
  slider: {},
  data: function() {
    return {
      time: 900
    }
  },
  filters: {
    formatTime: function(value) {

      return (value < 1000 ? "0" + value/100 + ":00" : value/100 + ":00");

    }
  },
  mounted: function() {

    var component = this;

    var range = document.getElementById('time-range-slider');

    component.$options.slider = noUiSlider.create(range, {
      range: {
        min: 0,
        max: 2300
      },
      step: 100,
      start: [component.time],
      format: {
        from: function(value) {
          return parseInt(Math.round(value/100)*100);
        },
        to: function(value) {
          return parseInt(Math.round(value/100)*100);
        }
      }
    });

    component.$options.slider.on('update', function(values) {

      EventBus.$emit('timeUpdated', values[0]);

      component.time = values[0];

    });

  }
};

</script>

<style lang="scss">

@import '../../node_modules/nouislider/distribute/nouislider.css';

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