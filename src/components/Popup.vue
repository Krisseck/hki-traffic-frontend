<template>
  <div id="stop-popup">
    <template v-if="typeof stop.id != 'undefined'">
      <h3>{{ stop.id }} - {{ stop.name }}</h3>
      <p>
        <strong>Averages (at {{ universalTime | formatTime }}):</strong><br/>
        <strong>Towards city center:</strong><br/>
        Passenger cars: {{ Math.round(stop.data[1][time].ha*100)/100 }}<br/>
        Vans: {{ Math.round(stop.data[1][time].pa*100)/100 }}<br/>
        Light trucks: {{ Math.round(stop.data[1][time].ka*100)/100 }}<br/>
        Heavy trucks: {{ Math.round(stop.data[1][time].ra*100)/100 }}<br/>
        Buses: {{ Math.round(stop.data[1][time].la*100)/100 }}<br/>
        Motorcycles: {{ Math.round(stop.data[1][time].mp*100)/100 }}<br/>
        Trams: {{ Math.round(stop.data[1][time].rv*100)/100 }}<br/>
        Total: {{ Math.round(stop.data[1][time].autot*100)/100 }}<br/><br/>
        <strong>Away from city center:</strong><br/>
        Passenger cars: {{ Math.round(stop.data[2][time].ha*100)/100 }}<br/>
        Vans: {{ Math.round(stop.data[2][time].pa*100)/100 }}<br/>
        Light trucks: {{ Math.round(stop.data[2][time].ka*100)/100 }}<br/>
        Heavy trucks: {{ Math.round(stop.data[2][time].ra*100)/100 }}<br/>
        Buses: {{ Math.round(stop.data[2][time].la*100)/100 }}<br/>
        Motorcycles: {{ Math.round(stop.data[2][time].mp*100)/100 }}<br/>
        Trams: {{ Math.round(stop.data[2][time].rv*100)/100 }}<br/>
        Total: {{ Math.round(stop.data[2][time].autot*100)/100 }}
      </p>
      <div id="average-chart"></div>
      <div id="predict-container">
        <h3>Predict future traffic patterns</h3>
        <p>Predict the traffic patterns for the next 4 hours using neural networks.</p>
        <p><strong>Input current traffic information</strong></p>
        <p>
          Stop: {{ stop.id }}<br/>
          Direction: <select v-model="direction">
            <option value="1">Towards city center</option>
            <option value="2">Away from city center</option>
          </select><br/>
          Time: <select v-model="time">
            <option value="0">00:00</option>
            <option value="100">01:00</option>
            <option value="200">02:00</option>
            <option value="300">03:00</option>
            <option value="400">04:00</option>
            <option value="500">05:00</option>
            <option value="600">06:00</option>
            <option value="700">07:00</option>
            <option value="800">08:00</option>
            <option value="900">09:00</option>
            <option value="1000">10:00</option>
            <option value="1100">11:00</option>
            <option value="1200">12:00</option>
            <option value="1300">13:00</option>
            <option value="1400">14:00</option>
            <option value="1500">15:00</option>
            <option value="1600">16:00</option>
            <option value="1700">17:00</option>
            <option value="1800">18:00</option>
            <option value="1900">19:00</option>
            <option value="2000">20:00</option>
            <option value="2100">21:00</option>
            <option value="2200">22:00</option>
            <option value="2300">23:00</option>
          </select><br/>
          Passenger cars: <input type="text" v-model="ha" /><br/>
          Vans: <input type="text" v-model="pa" /><br/>
          Light trucks: <input type="text" v-model="ka" /><br/>
          Heavy trucks: <input type="text" v-model="ra" /><br/>
          Buses: <input type="text" v-model="la" /><br/>
          Motorcycles: <input type="text" v-model="mp" /><br/>
          Trams: <input type="text" v-model="rv" />
        </p>
        <p><input type="submit" value="Predict" v-on:click="doPrediction"></p>
        <div v-if="predictions != null">
          <h2>Predictions</h2>
          <p v-for="prediction in predictions" v-bind:key="prediction.index">
            <strong>At {{ (time + (prediction.index*100)) | formatTime }}</strong><br/>
            Passenger cars: {{ Math.round(prediction.ha*100)/100 }}<br/>
            Vans: {{ Math.round(prediction.pa*100)/100 }}<br/>
            Light trucks: {{ Math.round(prediction.ka*100)/100 }}<br/>
            Heavy trucks: {{ Math.round(prediction.ra*100)/100 }}<br/>
            Buses: {{ Math.round(prediction.la*100)/100 }}<br/>
            Motorcycles: {{ Math.round(prediction.mp*100)/100 }}<br/>
            Trams: {{ Math.round(prediction.rv*100)/100 }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import Vue from 'vue';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import KerasJS from 'keras-js'

import EventBus from '@/event-bus.js';

import stops from '@/stops.json';

export default {
  name: 'Popup',
  chart: {},
  model: {},
  modelFilepath: '/shorter_term_dense_4.bin',
  data: function() {
    return {
      stop: {},
      universalTime: 900,
      direction: 1,
      time: 900,
      ha: 10,
      pa: 10,
      ka: 10,
      ra: 10,
      la: 10,
      mp: 10,
      rv: 10,
      predictions: null
    };
  },
  created: function() {

    var component = this;

    EventBus.$on('markerClicked', function(data) {

      Vue.set(component, 'stop', data);

      Vue.nextTick(function() {

        // Init charts

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

        // Init model

        component.$options.model = new KerasJS.Model({
          filepath: component.$options.modelFilepath,
          gpu: true
        });

        // Scroll to popup

        document.getElementById("stop-popup").scrollIntoView();

      })

    });

    EventBus.$on('timeUpdated', function(time) {

      component.universalTime = time;

    });

  },
  methods: {
    doPrediction: function() {

      var component = this;

      component.predictions = null;

      // Modify the input data to be suitable for the model

      var inputData = new Float32Array([
        component.stop.stopIndex / stops.length,
        component.direction - 1,
        component.time / 2400,
        component.ha / 5000,
        component.pa / 1000,
        component.ka / 100,
        component.ra / 250,
        component.la / 250,
        component.mp / 250,
        component.rv / 50
      ]);

      console.log(inputData);

      component.$options.model.predict({
        input: inputData
      }).then(function(prediction) {

        var predictionsPerHour = [];

        for(var i = 0; i <= 3; i++) {
          predictionsPerHour.push({
            index: i,
            ha: prediction.output[(i*7)+0] * 5000,
            pa: prediction.output[(i*7)+1] * 1000,
            ka: prediction.output[(i*7)+2] * 100,
            ra: prediction.output[(i*7)+3] * 250,
            la: prediction.output[(i*7)+4] * 250,
            mp: prediction.output[(i*7)+5] * 250,
            rv: prediction.output[(i*7)+6] * 50
          })
        }

        Vue.set(component, 'predictions', predictionsPerHour);

      });

    }
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