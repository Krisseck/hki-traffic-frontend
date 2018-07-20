<template>
  <div id="page-home">
    <leaflet-map></leaflet-map>
    <slider></slider>
    <popup></popup>
  </div>
</template>

<script>

import LeafletMap from '@/components/LeafletMap';
import Slider from '@/components/Slider';
import Popup from '@/components/Popup';

export default {
  name: 'Home',
  components: {
    'leaflet-map': LeafletMap,
    'slider': Slider,
    'popup': Popup
  }
};

</script>

<style lang="scss">

</style>