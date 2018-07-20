<template>
  <div id="app">
    <div id="nav-toggle"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Ik0yNCwzYzAtMC42LTAuNC0xLTEtMUgxQzAuNCwyLDAsMi40LDAsM3YyYzAsMC42LDAuNCwxLDEsMWgyMmMwLjYsMCwxLTAuNCwxLTFWM3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgIDxwYXRoIGQ9Ik0yNCwxMWMwLTAuNi0wLjQtMS0xLTFIMWMtMC42LDAtMSwwLjQtMSwxdjJjMCwwLjYsMC40LDEsMSwxaDIyYzAuNiwwLDEtMC40LDEtMVYxMXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgIDxwYXRoIGQ9Ik0yNCwxOWMwLTAuNi0wLjQtMS0xLTFIMWMtMC42LDAtMSwwLjQtMSwxdjJjMCwwLjYsMC40LDEsMSwxaDIyYzAuNiwwLDEtMC40LDEtMVYxOXoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+Cjwvc3ZnPgo=" v-on:click="menuOpened = !menuOpened" /></div>
    <div id="nav" v-bind:class="{'opened': menuOpened}">
      <router-link to="/" v-on:click.native="menuOpened = false" class="router-link">Home</router-link>
      <router-link to="/about" v-on:click.native="menuOpened = false" class="router-link">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      menuOpened: false
    }
  }
};

</script>

<style lang="scss">

@import './assets/reset.scss';

strong, b {
  font-weight: bold;
}

#nav-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  img {
    width: 3rem;
  }
}

#nav {
  position: fixed;
  top: 0;
  right: -20rem;
  width: 20rem;
  height: 100vh;
  background: white;
  z-index: 1001;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
  &.opened {
    right: 0;
  }
  .router-link {
    display: block;
    border-bottom: 1px solid #999;
    padding: 1rem 0.5rem;
    text-decoration: none;
    color: black;
    &:hover {
      background: #eee;
    }
    &.router-link-exact-active {
      color: red;
    }
  }
}

</style>
