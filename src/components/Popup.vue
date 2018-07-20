<template>
  <div id="stop-popup">
    <template v-if="typeof stop.id != 'undefined'">
      <h3>{{ stop.id }} - {{ stop.name }}</h3>
      <p>
        <strong>Averages (per hour):</strong><br/>
        <strong>Towards city center:</strong><br/>
        Passenger cars: {{ Math.round(stop.data[1][time].ha*100)/100 }}<br/>
        Vans: {{ Math.round(stop.data[1][time].pa*100)/100 }}<br/>
        Light trucks: {{ Math.round(stop.data[1][time].ka*100)/100 }}<br/>
        Heavy trucks: {{ Math.round(stop.data[1][time].ra*100)/100 }}<br/>
        Buses: {{ Math.round(stop.data[1][time].la*100)/100 }}<br/>
        Motorcycles: {{ Math.round(stop.data[1][time].mp*100)/100 }}<br/>
        Total: {{ Math.round(stop.data[1][time].autot*100)/100 }}<br/><br/>
        <strong>Away from city center:</strong><br/>
        Passenger cars: {{ Math.round(stop.data[2][time].ha*100)/100 }}<br/>
        Vans: {{ Math.round(stop.data[2][time].pa*100)/100 }}<br/>
        Light trucks: {{ Math.round(stop.data[2][time].ka*100)/100 }}<br/>
        Heavy trucks: {{ Math.round(stop.data[2][time].ra*100)/100 }}<br/>
        Buses: {{ Math.round(stop.data[2][time].la*100)/100 }}<br/>
        Motorcycles: {{ Math.round(stop.data[2][time].mp*100)/100 }}<br/>
        Total: {{ Math.round(stop.data[2][time].autot*100)/100 }}
      </p>
    </template>
  </div>
</template>

<script>

import EventBus from '@/event-bus.js';
import Vue from 'vue';

export default {
  name: 'Popup',
  data: function() {
    return {
      stop: {},
      time: 900
    };
  },
  created: function() {

    var component = this;

    EventBus.$on('markerClicked', function(data) {

      Vue.set(component, 'stop', data);

      Vue.nextTick(function() {
        document.getElementById("stop-popup").scrollIntoView();
      })

    });

    EventBus.$on('timeUpdated', function(time) {

      component.time = time;

    });

  }
};

</script>

<style lang="scss">

#stop-popup {
  width: 100%;
}