<template>	
<div id="#app">
		<div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.png" />			
		</div>
		<div id="signup_form" class="template">
			<h1>INSCRIPTION</h1>
			<p>
				Déjà membre ?<router-link to="/login"> > Cliquez ici &lt;</router-link>
			</p>
			<!-- create account form -->
			<form @submit.prevent="submitSignupForm">
				<div>
					<input type="email" name="email" placeholder="Adresse e-mail" v-model="userInfos.email" />
				</div>
				<br />
				<div>
					<input type="text" name="nom" placeholder="Nom" v-model="userInfos.lastname" />
				</div>
				<br />
				<div>
					<input type="text" name="prenom" placeholder="Prenom" v-model="userInfos.firstname" />
				</div>
				<br />
				<div>
					<input type="password" name="password" placeholder="Mot de passe" v-model="userInfos.password" />
				</div>
				<br />
				<button class="button" type="submit">S'inscrire</button>
			</form>
		</div>
		</div>
</template>

<script>
import * as Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const app = Vue.createApp();
app.use(VueAxios, axios);

export default {
	name: "signup",
	data() {
		return {
			userInfos :{
				email: "",
				lastname: "",
				firstname: "",
				password: "",
			}
		}
	},
	methods: {
		// create account 
		submitSignupForm() {
			axios.post('http://127.0.0.1:3000/api/auth/signup', {
				email: this.userInfos.email,
				lastname: this.userInfos.lastname,
				firstname: this.userInfos.firstname,
				password: this.userInfos.password,
			}).then(response => {
				console.log(response);
				this.$router.push('/Login')
				alert("compte créé");
			}).catch(error => {
				console.log(error);
				alert("e-mail déjà utilisé");
			})
		}
	}
};
</script>

<style scoped>


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
	margin-top: 30px;
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
	background: linear-gradient(to bottom right, #4e5166, #fd2d01, #4e5166);
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
	color: black;
	background: linear-gradient(to top right, #fd2d01, #4e5166, #fd2d01);
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

@media all and (max-width: 650px) {
	#signup_form {
		max-width: 650px;
		border-radius: 0;
	}
}
</style>
