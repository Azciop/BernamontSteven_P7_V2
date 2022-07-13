<template>
	<div id="#app">
		<div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.png" />			
		</div>
        <div id="signup_form" class="template">
            <h1>CONNEXION</h1>
            <p>Pas encore membre ? <router-link to="/signup"> > Cliquez ici &lt; </router-link>
            </p>
            <form @submit.prevent="submitLoginForm">
                <div>
                    <input type="email" name="email" v-model="email" placeholder="Adresse e-mail">
                </div>
                <br>
                <div>
                    <input type="password" name="password"  v-model="password" placeholder="Mot de passe">
                </div>
                <br>
                <button class="button" type="submit">Se connecter</button>
            </form>
        </div>
		</div>
</template>

<script>

import * as Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import setAuthHeader from '../utils/setAuthHeader';


const app = Vue.createApp();
app.use(VueAxios, axios);

export default {
    name: "login",
	data () {
		return {
			email: "",
			password: ""
		}
	},
	methods: {
		submitLoginForm() {
			axios.post('http://127.0.0.1:3000/api/auth/login', {
				email: this.email,
				password: this.password,
			}).then(response => {
				console.log(response);
				localStorage.setItem('token', response.data.token);
				setAuthHeader(response.data.token);
				this.$router.push('/accueil')
			}).catch(error => {
				console.log(error);
				alert("Email ou mot de passe incorrect");
			})
		}
	}
}
</script>

<style scoped>
.template {
	background-color: #ffd7d7;
}

.logo {
	 position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
	width: 500px;
}


#signup_form {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;
	width: 100%;
	max-width: 400px;
    background-color: #ffd7d7;
    border-radius: 20px;
	text-align: center;
	padding: 20px 0 20px 0;
	margin: 0px;
}

h1 {
	margin: 0;
}

a {
	color: blue;
	text-decoration: none;
}

a:hover {
	color: darkblue;
	font-weight: bold;
}

p {
	font-weight: bold;
	font-size: larger;
}

.button {
	margin: 0 0 57px 0;
	border-radius: 35px;
	border-style: none;
	background: linear-gradient(to bottom right,  #4e5166 ,#fd2d01, #4e5166);
	font-size: 1em;
	color: white;
	font-weight: bold;
	height: 50px;
	padding: 0 20px 0 20px;
	box-shadow: 3px 3px 20px #aaa;
	cursor: pointer;
	margin: 0;
}
 .button:hover {
	color:black;
	background: linear-gradient(to top right, #fd2d01, #4e5166 ,#fd2d01);
 }

 input {
	margin: 0 0 57px 0;
	border-radius: 35px;
	border-style: none;
	font-size: 1em;
	font-weight: bold;
	height: 50px;
	padding: 0 20px 0 20px;
	box-shadow: 3px 3px 20px #aaa;
	margin: 0;
 }
</style>