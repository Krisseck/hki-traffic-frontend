<template>
  <div id="page-melbourne">
    <site-title></site-title>
    <leaflet-map-melbourne></leaflet-map-melbourne>
    <slider></slider>
    <popup></popup>
  </div>
</template>

<script>

import LeafletMapMelbourne from '@/components/LeafletMapMelbourne';
import Slider from '@/components/Slider';
import Popup from '@/components/Popup';
import SiteTitle from '@/components/SiteTitle';

export default {
  name: 'Home',
  components: {
    'leaflet-map-melbourne': LeafletMapMelbourne,
    'slider': Slider,
    'popup': Popup,
    'site-title': SiteTitle
  }
};

</script>

<style lang="scss">

</style>