<template>
  <div id="page-home">
    <div id="map">&nbsp;</div>
    <div id="time-range-container">
      <p>Time is: {{ time | formatTime }}</p>
      <div id="time-range-slider"></div>
    </div>
  </div>
</template>

<script>

import L from 'leaflet';

import noUiSlider from 'nouislider';

import stops from '@/stops.json';

export default {
  name: 'Home',
  map: {},
  tileLayer: {},
  markerIcon: {},
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
  formatAverageCars: function(value) {

    return "<span class='car-average car-average-color-" + Math.round(value/200) + "'>" + Math.round(value) + '</span>';

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
      start: component.time,
      format: {
        from: function(value) {
          return parseInt(value);
        },
        to: function(value) {
          return parseInt(value);
        }
      }
    });

    slider.on('update', function(values) {

      component.time = values[0];

    });

    this.$options.map = L.map('map', {
      center: [60.192059, 24.945831],
      zoom: 12
    });

    this.$options.markerIcon = new L.Icon.Default({imagePath: '/'});

    this.$options.tileLayer = L.tileLayer('http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg', {
      detectRetina: true,
      attribution: '&copy; Map: <a href="http://www.maanmittauslaitos.fi/avoindata">Maanmittauslaitos</a>'
    }).addTo(this.$options.map);

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

      var popupContent = '<h3>' + item.id + ' - ' + item.name + '</h3><p><strong>Averages (per hour)</strong><br/><strong>Direction 1:</strong><br/>';

      if(typeof item.data[1] != "undefined") {
        popupContent = popupContent + 'Passenger cars: ' + Math.round(item.data[1][component.time].ha*100)/100 + '<br/>Vans: ' + Math.round(item.data[1][component.time].pa*100)/100 + '<br/>Light trucks: ' + Math.round(item.data[1][component.time].ka*100)/100 + '<br/>Heavy trucks: ' + Math.round(item.data[1][component.time].ra*100)/100 + '<br/>Buses: ' + Math.round(item.data[1][component.time].la*100)/100 + '<br/>Motorcycles: ' + Math.round(item.data[1][component.time].mp*100)/100 + '<br/>Total: ' + Math.round(item.data[1][component.time].autot*100)/100;
      } else {
        popupContent = popupContent + 'No data available';
      }

      popupContent = popupContent + '<br/><br/><strong>Direction 2:</strong><br/>';

      if(typeof item.data[2] != "undefined") {
        popupContent = popupContent + 'Passenger cars: ' + Math.round(item.data[2][component.time].ha*100)/100 + '<br/>Vans: ' + Math.round(item.data[2][component.time].pa*100)/100 + '<br/>Light trucks: ' + Math.round(item.data[2][component.time].ka*100)/100 + '<br/>Heavy trucks: ' + Math.round(item.data[2][component.time].ra*100)/100 + '<br/>Buses: ' + Math.round(item.data[2][component.time].la*100)/100 + '<br/>Motorcycles: ' + Math.round(item.data[2][component.time].mp*100)/100 + '<br/>Total: ' + Math.round(item.data[2][component.time].autot*100)/100;
      } else {
        popupContent = popupContent + 'No data available';
      }

      popupContent = popupContent + '</p>';

      marker.bindPopup(popupContent).openPopup();

    });

  }
};

</script>

<style lang="scss">

@import '../../node_modules/leaflet/dist/leaflet.css';

@import '../../node_modules/nouislider/distribute/nouislider.css';

#page-home {
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