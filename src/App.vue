<template>
  <div id="app">
    <div id="nav">
      <router-link to="/demo01">Demo01</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/demo_worker">demo_worker</router-link> |
      <router-link to="/demo_worker2">demo_worker2</router-link> |
      <router-link to="/demo_deferred_before">demo_deferred_before</router-link> |
      <router-link to="/demo_deferred_after">demo_deferred_after</router-link> |
      <router-link to="/demo_time_slicing">demo_time_slicing</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
