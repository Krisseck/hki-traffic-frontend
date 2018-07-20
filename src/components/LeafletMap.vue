<template>
  <div id="map"></div>
</template>

<script>

import L from 'leaflet';

import EventBus from '@/event-bus.js';

import stops from '@/stops.json';

export default {
  name: 'LeafletMap',
  map: {},
  tileLayer: {},
  markerIcon: {},
  markers: {},
  data: function() {
    return {
      time: 900
    }
  },
  formatAverageCars: function(value) {

    return "<span class='car-average car-average-color-" + Math.round(value/200) + "'>" + Math.round(value) + '</span>';

  },
  methods: {
    loadMarkers: function() {

      var component = this;

      stops.forEach(function(item) {

        var marker = L.marker([item.lat, item.lng], {
          icon: component.$options.markerIcon
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

    component.$options.markerIcon = new L.Icon.Default({imagePath: '/'});

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
}

</style>