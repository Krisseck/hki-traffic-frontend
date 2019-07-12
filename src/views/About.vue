<template>
  <div id="page-about">
    <div class="section">
      <div class="container">
        <h1 class="title is-1">Helsinki Traffic Forecast</h1>
        <p class="subtitle">AI-driven traffic forecast prediction and analytics platform</p>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h3 class="title is-3 is-spaced">Description</h3>
        <p class="content"><strong>Helsinki Traffic Forecast</strong> is a platform used to analyze and predict traffic patterns in Helsinki. It uses open data provided by <a href="https://hri.fi" target="_blank">Helsinki Region Infoshare</a>, <a href="https://www.maanmittauslaitos.fi/en" target="_blank">National Land Survey of Finland</a> and <a href="http://en.ilmatieteenlaitos.fi/" target="_blank">Finnish Meteorological Institute</a>.</p>
        <p class="content">Using this tool, traffic patterns in Helsinki area can be inspected and analyzed. The data is accessible per hour, and it includes information breakdowns, for example traffic by vehicle type.</p>
        <p class="content">Traffic patterns are predicted using a custom-trained neural network AI. The source code is viewable under the title "Open Source".</p>
        <p class="content">Air quality is displayed on the map using the average amount measured nitrogen dioxide values.</p>
        <p class="content">The Global Forecast model can be used for various nudging solutions. A planned application is to offer citizen predictive information about their neighbourhood's air quality: bad air quality on your own area and neighbourhood can be a motivational reason to choose public transport on that day (and take the step for the future change of habits, too). </p>
        <h3 class="title is-3">Video</h3>
        <p class="content">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/p0psRmuNzEc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </p>
        <h3 class="title is-3">Screenshots</h3>
        <p class="content screenshots">
          <a href="/helsinki-traffic-screenshot-1.jpg" target="_blank"><img src="/helsinki-traffic-screenshot-1-thumbnail.jpg" alt="Helsinki Traffic Forecast: Screenshot 1"></a> <a href="/helsinki-traffic-screenshot-2.jpg" target="_blank"><img src="/helsinki-traffic-screenshot-2-thumbnail.jpg" alt="Helsinki Traffic Forecast: Screenshot 2"></a> <a href="/helsinki-traffic-screenshot-3.jpg" target="_blank"><img src="/helsinki-traffic-screenshot-3-thumbnail.jpg" alt="Helsinki Traffic Forecast: Screenshot 3"></a> <a href="/helsinki-traffic-screenshot-4.jpg" target="_blank"><img src="/helsinki-traffic-screenshot-4-thumbnail.jpg" alt="Helsinki Traffic Forecast: Screenshot 4"></a> <a href="/helsinki-traffic-screenshot-5.jpg" target="_blank"><img src="/helsinki-traffic-screenshot-5-thumbnail.jpg" alt="Helsinki Traffic Forecast: Screenshot 5"></a>
        </p>
        <h3 class="title is-3">Source material</h3>
        <p class="content">Traffic data: <a href="https://hri.fi/data/en_GB/dataset/liikennemaarat-helsingissa" target="_blank">Traffic volumes in Helsinki by HRI</a><br/>
          Map tiles: <a href="https://www.maanmittauslaitos.fi/en/maps-and-spatial-data/expert-users/product-descriptions/background-map-series-raster" target="_blank">Background map series by National Land Survey of Finland</a> (hosted by <a href="http://kartat.kapsi.fi/" target="_blank">Kapsi ry</a>)<br/>
          Air Quality: <a href="https://en.ilmatieteenlaitos.fi/open-data" target="_blank">Finnish Meteorological Institute</a></p>
        <h3 class="title is-3">Technologies used</h3>
        <h5 class="title is-5">Frontend</h5>
        <p class="content">
          <a href="https://vuejs.org/" target="_blank">Vue.js</a><br/>
          <a href="https://bulma.io" target="_blank">Bulma</a><br/>
          <a href="https://gionkunz.github.io/chartist-js/" target="_blank">Chartist.js</a><br/>
          <a href="https://transcranial.github.io/keras-js/#/" target="_blank">Keras.js</a><br/>
          <a href="https://leafletjs.com/" target="_blank">Leaflet</a>
        </p>
        <h5 class="title is-5">Neural Network AI</h5>
        <p class="content">
          <a href="https://keras.io/" target="_blank">Keras</a><br/>
          <a href="https://www.tensorflow.org/" target="_blank">Tensorflow</a>
        </p>
        <h3 class="title is-3">Team</h3>
        <p class="content">
          <strong><a href="https://vaiste.com" target="_blank">Vaiste Productions Oy</a></strong><br/>
          <a href="https://twitter.com/kristian_polso" target="_blank">Kristian Polso</a><br/>
          <a href="https://twitter.com/juhovaiste" target="_blank">Juho Vaiste</a>
        </p>
        <h3 class="title is-3">Open source</h3>
        <p class="content">
          Frontend: <a href="https://github.com/Krisseck/hki-traffic-frontend" target="_blank">Krisseck/hki-traffic-frontend @ Github</a><br/>
          Neural Network AI: <a href="https://github.com/Krisseck/hki-traffic-predict" target="_blank">Krisseck/hki-traffic-predict @ Github</a><br/>
          License: MIT
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.screenshots {
  img {
    height: 8rem;
    width: auto;
    border: 1px solid #ccc;
    margin: 0 2rem 2rem 0;
    &:hover {
      border-color: #666;
    }
  }
}

</style>
