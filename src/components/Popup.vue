<template>
  <div id="stop-popup">
    <template v-if="typeof stop.id != 'undefined'">
      <h3>{{ stop.id }} - {{ stop.name }}</h3>
      <p>
        <strong>Averages (at {{ time | formatTime }}):</strong><br/>
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
      <div id="average-chart"></div>
    </template>
  </div>
</template>

<script>

import Vue from 'vue';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';

import EventBus from '@/event-bus.js';

export default {
  name: 'Popup',
  chart: {},
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

        var chartSeries1 = [];
        var chartSeries2 = [];

        for(var i = 0; i <= 2300; i = i + 100) {

          chartSeries1.push({
            meta: Vue.options.filters.formatTime(i) + ' - Towards city center',
            value: Math.round(component.stop.data[1][i].autot*100)/100
          });

          chartSeries2.push({
            meta: Vue.options.filters.formatTime(i) + ' - Away from city center',
            value: Math.round(component.stop.data[2][i].autot*100)/100
          });


        }

        component.$options.chart = new Chartist.Line('#average-chart', {
          labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
          series: [chartSeries1, chartSeries2],
        }, {
          low: 0,
          high: 5000,
          plugins: [
            Chartist.plugins.tooltip()
          ]
        });

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

@import "../../node_modules/chartist/dist/scss/settings/_chartist-settings.scss";
@import "../../node_modules/chartist/dist/scss/chartist.scss";
@import "../../node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";

#stop-popup {
  width: 100%;
}

#average-chart {
  width: 100%;
  height: 50vh;
  position: relative;
}

</style>