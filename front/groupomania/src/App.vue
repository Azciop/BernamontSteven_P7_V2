<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

  import signup from './pages/Signup.vue';
  import login from './pages/Login.vue';
  import accueil from './pages/Accueil.vue';
  import account from './pages/Account.vue';
  import adminDashboard from './pages/adminDashboard.vue';
  
export default {
  name: 'App',
  components: {
    signup,
    login,
    accueil,
    account,
    adminDashboard,
  }
}
</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
 #app {
  font-family: 'Lato', sans-serif;
 }
 body {
	margin: 0;

}


</style>
