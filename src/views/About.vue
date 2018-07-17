<template>
  <div id="page-about">
    <div id="map">&nbsp;</div>
  </div>
</template>

<script>

import L from 'leaflet';

import stops from '@/stops.json';

export default {
  name: 'about',
  map: {},
  tileLayer: {},
  markerIcon: {},
  data: function() {
    return {
    }
  },
  mounted: function() {

    var component = this;

    this.$options.map = L.map('map', {
      center: [60.192059, 24.945831],
      zoom: 12
    });

    this.$options.markerIcon = new L.Icon.Default({imagePath: '/'});

    this.$options.tileLayer = L.tileLayer('http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg', {
      attribution: '&copy; Karttamateriaali <a href="http://www.maanmittauslaitos.fi/avoindata">Maanmittauslaitos</a>'
    }).addTo(this.$options.map);

    stops.forEach(function(item) {
      var marker = L.marker([item.lat, item.lng], {
        icon: component.$options.markerIcon
      }).addTo(component.$options.map);
      marker.bindPopup('<h3>' + item.id + ' - ' + item.name + '</h3>').openPopup();
    });

  }
};

</script>

<style lang="scss">

@import '../../node_modules/leaflet/dist/leaflet.css';

#page-about {
  #map {
    width: 100%;
    height: 80vh;
  }
}

</style>