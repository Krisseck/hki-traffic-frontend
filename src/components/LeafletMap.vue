<template>
  <div id="map"></div>
</template>

<script>

import L from 'leaflet';

import EventBus from '@/event-bus.js';

import stops from '@/stops.json';

import airQuality from '@/air.json';

export default {
  name: 'LeafletMap',
  map: {},
  tileLayer: {},
  markerIcon: {},
  markers: {},
  circles: {},
  data: function() {
    return {
      time: 900
    }
  },
  formatAverageCars: function(value) {

    return "<span class='car-average car-average-color-" + Math.round(value/200) + "'>" + Math.round(value) + '</span>';

  },
  formatAverageAirQuality: function(value) {

    return "<span class='air-quality-average air-quality-average-color-" + Math.round(value/10) + "'>" + Math.round(value) + '</span>';

  },
  formatAverageAirQualityColor: function(value) {

    value = Math.round(value/10);

    var color = '';

    switch(value) {
      case 0:
        color = '#0f0';
      break;
      case 1:
        color = '#2f0';
      break;
      case 2:
        color = '#4f0';
      break;
      case 3:
        color = '#6f0';
      break;
      case 4:
        color = '#8f0';
      break;
      case 5:
        color = '#af0';
      break;
      case 6:
        color = '#cf0';
      break;
      case 7:
        color = '#ef0';
      break;
      case 8:
        color = '#ff0';
      break;
      case 9:
        color = '#fd0';
      break;
      case 10:
        color = '#fb0';
      break;
      case 11:
        color = '#f90';
      break;
      case 12:
        color = '#f70';
      break;
      case 13:
        color = '#f50';
      break;
      case 14:
        color = '#f30';
      break;
      default:
        color = '#f00';
      break;

    }

    return color;

  },
  methods: {
    loadMarkers: function() {

      var component = this;

      stops.forEach(function(item, index) {

        item.stopIndex = index;

        var marker = L.marker([item.lat, item.lng], {
          icon: component.$options.markerStopIcon
        }).addTo(component.$options.map);

        var totalCars = 0;

        if(typeof item.data[1] != "undefined") {
          totalCars = totalCars + item.data[1][component.time].autot;
        }

        if(typeof item.data[2] != "undefined") {
          totalCars = totalCars + item.data[2][component.time].autot;
        }

        marker.bindTooltip('<strong>' + item.id + '</strong> - ' + component.$options.formatAverageCars(totalCars), {
          permanent: true
        });

        marker.on('click', function() {
          EventBus.$emit('markerClicked', item);
        });

        component.$options.markers[item.id] = marker;

      });

      airQuality.forEach(function(item) {

        var marker = L.marker([item.latitude, item.longitude], {
          icon: component.$options.markerTowerIcon
        }).addTo(component.$options.map);

        marker.bindTooltip('<strong>NO<sub>2</sub></strong> - ' + component.$options.formatAverageAirQuality(item.data[component.time].nitrogen_dioxide), {
          permanent: true
        });

       var circle = L.circle([item.latitude, item.longitude], {radius: 2500, stroke: false, color: component.$options.formatAverageAirQualityColor(item.data[component.time].nitrogen_dioxide)}).addTo(component.$options.map);

        component.$options.circles[item.code] = circle;

        component.$options.markers[item.code] = marker;

      });

    },
    refreshMarkers: function() {

      var component = this;
      
      stops.forEach(function(item) {

        var totalCars = 0;

        if(typeof item.data[1] != "undefined") {
          totalCars = totalCars + item.data[1][component.time].autot;
        }

        if(typeof item.data[2] != "undefined") {
          totalCars = totalCars + item.data[2][component.time].autot;
        }

        component.$options.markers[item.id].setTooltipContent('<strong>' + item.id + '</strong> - ' + component.$options.formatAverageCars(totalCars));

      });

      airQuality.forEach(function(item) {

        component.$options.markers[item.code].setTooltipContent('<strong>NO<sub>2</sub></strong> - ' + component.$options.formatAverageAirQuality(item.data[component.time].nitrogen_dioxide));

        component.$options.circles[item.code].setStyle({stroke: false, color: component.$options.formatAverageAirQualityColor(item.data[component.time].nitrogen_dioxide)});

      });

    }
  },
  created: function() {

    var component = this;

    EventBus.$on("timeUpdated", function(time) {
      component.time = time;
      component.refreshMarkers();
    });

  },
  mounted: function() {

    var component = this;

    component.$options.map = L.map('map', {
      center: [60.192059, 24.945831],
      zoom: 12
    });

    component.$options.markerStopIcon = L.icon({
      iconUrl: '/marker-stop.png',
      iconRetinaUrl: '/marker-stop-2x.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [64, 64],
      shadowSize: [41, 41],
      iconAnchor: [32, 64],
      shadowAnchor: [15, 40],
      tooltipAnchor: [18, -48]
    });

    component.$options.markerTowerIcon = L.icon({
      iconUrl: '/marker-tower.png',
      iconRetinaUrl: '/marker-tower-2x.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [64, 64],
      shadowSize: [41, 41],
      iconAnchor: [32, 64],
      shadowAnchor: [15, 40],
      tooltipAnchor: [18, -48]
    });

    component.$options.tileLayer = L.tileLayer('http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg', {
      detectRetina: true,
      attribution: '&copy; Map: <a href="http://www.maanmittauslaitos.fi/avoindata">Maanmittauslaitos</a>'
    }).addTo(component.$options.map);

    component.loadMarkers();

  }
};

</script>

<style lang="scss">

@import '../../node_modules/leaflet/dist/leaflet.css';

#map {
  width: 100vw;
  height: 100vh;
  .leaflet-control-container {
    .leaflet-top.leaflet-left {
      top: 4rem;
    }
  }
  .car-average {
    color: white;
    padding: 0.2rem;
  }
  .car-average-color-0 {
    background: #000000;
  }
  .car-average-color-1 {
    background: #110000;
  }
  .car-average-color-2 {
    background: #220000;
  }
  .car-average-color-3 {
    background: #330000;
  }
  .car-average-color-4 {
    background: #440000;
  }
  .car-average-color-5 {
    background: #550000;
  }
  .car-average-color-6 {
    background: #660000;
  }
  .car-average-color-7 {
    background: #770000;
  }
  .car-average-color-8 {
    background: #880000;
  }
  .car-average-color-9 {
    background: #990000;
  }
  .car-average-color-10 {
    background: #aa0000;
  }
  .car-average-color-11 {
    background: #bb0000;
  }
  .car-average-color-12 {
    background: #cc0000;
  }
  .car-average-color-13 {
    background: #dd0000;
  }
  .car-average-color-14 {
    background: #ee0000;
  }
  .car-average-color-15,
  .car-average-color-16,
  .car-average-color-17,
  .car-average-color-18,
  .car-average-color-19,
  .car-average-color-20,
  .car-average-color-21,
  .car-average-color-22,
  .car-average-color-23,
  .car-average-color-24,
  .car-average-color-25,
  .car-average-color-26,
  .car-average-color-27,
  .car-average-color-28,
  .car-average-color-29,
  .car-average-color-30,
  .car-average-color-31,
  .car-average-color-32,
  .car-average-color-33,
  .car-average-color-34,
  .car-average-color-35,
  .car-average-color-36,
  .car-average-color-37,
  .car-average-color-38,
  .car-average-color-39,
  .car-average-color-40,
  .car-average-color-41,
  .car-average-color-42,
  .car-average-color-43,
  .car-average-color-44,
  .car-average-color-45 {
    background: #ff0000;
  }
  .air-quality-average {
    color: white;
    padding: 0.2rem;
  }
  .air-quality-average-color-0 {
    background: #0f0;
  }
  .air-quality-average-color-1 {
    background: #2f0;
  }
  .air-quality-average-color-2 {
    background: #4f0;
  }
  .air-quality-average-color-3 {
    background: #6f0;
  }
  .air-quality-average-color-4 {
    background: #8f0;
  }
  .air-quality-average-color-5 {
    background: #af0;
  }
  .air-quality-average-color-6 {
    background: #cf0;
  }
  .air-quality-average-color-7 {
    background: #ef0;
  }
  .air-quality-average-color-8 {
    background: #ff0;
  }
  .air-quality-average-color-9 {
    background: #fd0;
  }
  .air-quality-average-color-10 {
    background: #fb0;
  }
  .air-quality-average-color-11 {
    background: #f90;
  }
  .air-quality-average-color-12 {
    background: #f70;
  }
  .air-quality-average-color-13 {
    background: #f50;
  }
  .air-quality-average-color-14 {
    background: #f30;
  }
  .air-quality-average-color-15,
  .air-quality-average-color-16,
  .air-quality-average-color-17,
  .air-quality-average-color-18,
  .air-quality-average-color-19,
  .air-quality-average-color-20,
  .air-quality-average-color-21,
  .air-quality-average-color-22,
  .air-quality-average-color-23,
  .air-quality-average-color-24,
  .air-quality-average-color-25,
  .air-quality-average-color-26,
  .air-quality-average-color-27 {
    background: #f00;
  }
}

</style>