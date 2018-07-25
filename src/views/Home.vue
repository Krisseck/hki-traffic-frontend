<template>
  <div id="page-home">
    <site-title></site-title>
    <leaflet-map></leaflet-map>
    <slider></slider>
    <popup></popup>
  </div>
</template>

<script>

import LeafletMap from '@/components/LeafletMap';
import Slider from '@/components/Slider';
import Popup from '@/components/Popup';
import SiteTitle from '@/components/SiteTitle';

export default {
  name: 'Home',
  components: {
    'leaflet-map': LeafletMap,
    'slider': Slider,
    'popup': Popup,
    'site-title': SiteTitle
  }
};

</script>

<style lang="scss">

</style>