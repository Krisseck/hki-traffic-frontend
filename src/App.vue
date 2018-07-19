<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
};

</script>

<style lang="scss">

@import './assets/reset.scss';


strong, b {
  font-weight: bold;
}

#nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
  height: 1.5rem;
  background: white;
  border-radius: 0 0 0 1rem;
  z-index: 1001;
}

</style>
