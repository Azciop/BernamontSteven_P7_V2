<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

  import signup from './pages/Signup.vue';
  import login from './pages/Login.vue';
  
export default {
  name: 'App',
  components: {
    signup,
    login
  }
}
</script>

<style>

</style>
