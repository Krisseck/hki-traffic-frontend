<template>
  <div id="stop-popup">
    <div class="section">
      <div class="container">
        <template v-if="typeof stop.id != 'undefined'">
          <div class="tabs">
            <ul>
              <li v-bind:class="{'is-active': activeTab == 'averages'}"><a v-on:click.prevent="activeTab = 'averages'">Current averages</a></li>
              <li v-bind:class="{'is-active': activeTab == 'predictions'}"><a v-on:click.prevent="activeTab = 'predictions'">Predictions</a></li>
            </ul>
          </div>
          <a href="#" class="button is-pulled-right">Go back to map</a>
          <h3 class="title is-3">{{ stop.id }} - {{ stop.name }}</h3>
          <template v-if="activeTab == 'averages'">
            <p class="content"><strong>Averages (at {{ universalTime | formatTime }})</strong></p>
            <div class="columns">
              <div class="column">
                <strong>Towards city center:</strong><br/>
                Passenger cars: {{ Math.round(stop.data[1][time].ha*100)/100 }}<br/>
                Vans: {{ Math.round(stop.data[1][time].pa*100)/100 }}<br/>
                Light trucks: {{ Math.round(stop.data[1][time].ka*100)/100 }}<br/>
                Heavy trucks: {{ Math.round(stop.data[1][time].ra*100)/100 }}<br/>
                Buses: {{ Math.round(stop.data[1][time].la*100)/100 }}<br/>
                Motorcycles: {{ Math.round(stop.data[1][time].mp*100)/100 }}<br/>
                Trams: {{ Math.round(stop.data[1][time].rv*100)/100 }}<br/>
                Total: {{ Math.round(stop.data[1][time].autot*100)/100 }}
              </div>
              <div class="column">
                <strong>Away from city center:</strong><br/>
                Passenger cars: {{ Math.round(stop.data[2][time].ha*100)/100 }}<br/>
                Vans: {{ Math.round(stop.data[2][time].pa*100)/100 }}<br/>
                Light trucks: {{ Math.round(stop.data[2][time].ka*100)/100 }}<br/>
                Heavy trucks: {{ Math.round(stop.data[2][time].ra*100)/100 }}<br/>
                Buses: {{ Math.round(stop.data[2][time].la*100)/100 }}<br/>
                Motorcycles: {{ Math.round(stop.data[2][time].mp*100)/100 }}<br/>
                Trams: {{ Math.round(stop.data[2][time].rv*100)/100 }}<br/>
                Total: {{ Math.round(stop.data[2][time].autot*100)/100 }}
              </div>
            </div>
            <div id="average-chart"></div>
          </template>
          <template v-if="activeTab == 'predictions'">
            <h5 class="title is-5">Predict future traffic patterns</h5>
            <p class="content">Input current traffic information and the neural network will predict the traffic patterns for the next 4 hours.</p>
            <div class="field">
              <label class="label">Stop</label>
              <div class="control">
                {{ stop.id }}
              </div>
            </div>
            <div class="field">
              <label class="label">Direction</label>
              <div class="control">
                <div class="select">
                  <select v-model="direction">
                    <option value="1">Towards city center</option>
                    <option value="2">Away from city center</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Time</label>
              <div class="control">
                <div class="select">
                  <select v-model="time">
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
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Passenger cars</label>
              <div class="control">
                <input type="text" v-model="ha" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Vans</label>
              <div class="control">
                <input type="text" v-model="pa" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Light trucks</label>
              <div class="control">
                <input type="text" v-model="ka" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Heavy trucks</label>
              <div class="control">
                <input type="text" v-model="ra" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Buses</label>
              <div class="control">
                <input type="text" v-model="la" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Motorcycles</label>
              <div class="control">
                <input type="text" v-model="mp" class="input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Trams</label>
              <div class="control">
                <input type="text" v-model="rv" class="input" />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input type="submit" value="Predict" class="button" v-on:click="doPrediction">
              </div>
            </div>
            <div v-if="predictions != null">
              <h5 class="title is-5">Predictions</h5>
              <div class="columns">
                <div class="column" v-for="prediction in predictions" v-bind:key="prediction.index">
                  <strong>At {{ (parseInt(time) + 100 + (prediction.index*100)) | formatTime }}</strong><br/>
                  Passenger cars: {{ Math.round(prediction.ha*100)/100 }}<br/>
                  Vans: {{ Math.round(prediction.pa*100)/100 }}<br/>
                  Light trucks: {{ Math.round(prediction.ka*100)/100 }}<br/>
                  Heavy trucks: {{ Math.round(prediction.ra*100)/100 }}<br/>
                  Buses: {{ Math.round(prediction.la*100)/100 }}<br/>
                  Motorcycles: {{ Math.round(prediction.mp*100)/100 }}<br/>
                  Trams: {{ Math.round(prediction.rv*100)/100 }}
                </div>
              </div>
              <div id="prediction-chart"></div>
            </div>
          </template>
        </template>
      </div>
    </div>
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
  averagesChart: {},
  predictionChart: {},
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
      predictions: null,
      activeTab: 'averages'
    };
  },
  created: function() {

    var component = this;

    EventBus.$on('markerClicked', function(data) {

      Vue.set(component, 'stop', data);

      Vue.nextTick(function() {

        component.initAveragesChart();

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
  watch: {
    activeTab: function(val) {

      var component = this;

      if(val == 'averages') {

        component.predictionChart = {};
        document.getElementById("prediction-chart").innerHTML = "";

        component.predictions = null;

        Vue.nextTick(function() {
          component.initAveragesChart();
        });

      } else if(val == 'predictions') {

        component.averagesChart = {};
        document.getElementById("average-chart").innerHTML = "";

      } 

    }
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

        component.initPredictionChart();

      });

    },
    initAveragesChart: function() {

      var component = this;

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

      component.$options.averagesChart = new Chartist.Line('#average-chart', {
        labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        series: [chartSeries1, chartSeries2],
      }, {
        low: 0,
        high: 5000,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });

    },
    initPredictionChart: function() {

      var component = this;

      // Init charts

      var chartSeries = [];

      var total = 0;

      for(var i = 1; i <= 4; i++) {

        total = component.predictions[i-1].ha + component.predictions[i-1].pa + component.predictions[i-1].ka + component.predictions[i-1].ra + component.predictions[i-1].la + component.predictions[i-1].mp + component.predictions[i-1].rv;

        chartSeries.push({
          meta: "Total amount of vehicles at " + Vue.options.filters.formatTime(parseInt(component.time) + (i*100)),
          value: Math.round(total*100)/100
        });

      }

      Vue.nextTick(function() {

        component.$options.predictionChart = new Chartist.Line('#prediction-chart', {
          labels: [Vue.options.filters.formatTime(parseInt(component.time) + 100), Vue.options.filters.formatTime(parseInt(component.time) + 200), Vue.options.filters.formatTime(parseInt(component.time) + 300), Vue.options.filters.formatTime(parseInt(component.time) + 400)],
          series: [chartSeries],
        }, {
          low: 0,
          plugins: [
            Chartist.plugins.tooltip()
          ]
        });

      });

    }
  }
};

</script>

<style lang="scss">

@import "../../node_modules/chartist/dist/scss/settings/_chartist-settings.scss";
$ct-line-width: 0.20rem;
$ct-point-size: 0.6rem;
$ct-point-shape: square;
$ct-series-colors: (
  #20498a,
  #4a84e0,
  #f4c63d,
  #d17905,
  #453d3f,
  #59922b,
  #0544d3,
  #6b0392,
  #f05b4f,
  #dda458,
  #eacf7d,
  #86797d,
  #b2c326,
  #6188e2,
  #a748ca
);

@import "../../node_modules/chartist/dist/scss/chartist.scss";
@import "../../node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";

.chartist-tooltip {
  background: white;
  box-shadow: 0 0 0.1rem rgba(0,0,0,0.3);
  font-size: 0.75rem;
  font-family: inherit;
  &::before {
    opacity: 0;
  }
}

#average-chart, #prediction-chart {
  width: 100%;
  height: 50vh;
  position: relative;
}

</style>