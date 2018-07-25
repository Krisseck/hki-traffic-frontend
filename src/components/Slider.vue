<template>
  <div id="time-range-container" class="card">
    <div class="card-content">
      <p>Time is: {{ time | formatTime }}</p>
      <div id="time-range-slider"></div>
    </div>
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
  position: absolute;
  top: 80vh;
  left: 50%;
  width: 18rem;
  height: 17vh;
  margin-left: -9rem;
  z-index: 1001;
  text-align: center;
  .card-content {
    padding: 1rem;
  }
  #time-range-slider {
    margin: 1rem auto;
  }
}

</style>