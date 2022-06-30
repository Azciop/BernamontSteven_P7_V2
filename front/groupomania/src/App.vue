<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

  import signup from './pages/Signup.vue';
  import login from './pages/Login.vue';
  import accueil from './pages/Accueil.vue';
  
export default {
  name: 'App',
  components: {
    signup,
    login,
    accueil
  }
}
</script>

<style>

</style>
