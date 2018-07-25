<template>
  <div id="app">
    <div id="nav-toggle"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Ik0yNCwzYzAtMC42LTAuNC0xLTEtMUgxQzAuNCwyLDAsMi40LDAsM3YyYzAsMC42LDAuNCwxLDEsMWgyMmMwLjYsMCwxLTAuNCwxLTFWM3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgIDxwYXRoIGQ9Ik0yNCwxMWMwLTAuNi0wLjQtMS0xLTFIMWMtMC42LDAtMSwwLjQtMSwxdjJjMCwwLjYsMC40LDEsMSwxaDIyYzAuNiwwLDEtMC40LDEtMVYxMXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgIDxwYXRoIGQ9Ik0yNCwxOWMwLTAuNi0wLjQtMS0xLTFIMWMtMC42LDAtMSwwLjQtMSwxdjJjMCwwLjYsMC40LDEsMSwxaDIyYzAuNiwwLDEtMC40LDEtMVYxOXoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+Cjwvc3ZnPgo=" v-on:click="menuOpened = !menuOpened" /></div>
    <aside class="menu" id="nav" v-bind:class="{'opened': menuOpened}">
      <ul class="menu-list">
        <li><router-link to="/" v-on:click.native="menuOpened = false" active-class="is-active" exact>Home</router-link></li>
        <li><router-link to="/about" v-on:click.native="menuOpened = false" active-class="is-active" exact>About</router-link></li>
      </ul>
    </aside>
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

@import '../node_modules/bulma/bulma.sass';
@import '../node_modules/bulmaswatch/lux/_variables.scss';
@import '../node_modules/bulmaswatch/lux/_overrides.scss';

#nav-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1005;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  img {
    width: 2.5rem;
  }
}

#nav {
  position: fixed;
  top: 0;
  right: -30rem;
  width: 18rem;
  height: 100vh;
  background: white;
  box-shadow: 0rem 0 1rem rgba(0,0,0,0.5);
  z-index: 1010;
  &.opened {
    right: 0;
  }
}

</style>
