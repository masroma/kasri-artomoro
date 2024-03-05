<template>
  <div class="h-screen">
    
    <!-- Header -->
    <Header v-if="$route.name != 'login'" />

    <!-- content -->
    <router-view></router-view>

    <!-- footer -->
    <Footer  v-if="$route.name != 'login'"/>

  </div>
</template>

<script>

  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {

    name: 'AppComponent',

    components: {
      Header,
      Footer
    }
  }
</script>

<style>

</style>