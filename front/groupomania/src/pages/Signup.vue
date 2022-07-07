<template>	
		<div id="signup_form" class="template">
			<h1>INSCRIPTION</h1>
			<p>
				Déjà membre ?<router-link to="/login"> > Cliquez ici &lt;</router-link>
			</p>
			<form @submit.prevent="submitSignupForm">
				<div>
					<input type="email" name="email" placeholder="Adresse e-mail" v-model="email" />
				</div>
				<br />
				<div>
					<input type="text" name="nom" placeholder="Nom" v-model="lastname" />
				</div>
				<br />
				<div>
					<input type="text" name="prenom" placeholder="Prenom" v-model="firstname" />
				</div>
				<br />
				<div>
					<input type="password" name="password" placeholder="Mot de passe" v-model="password" />
				</div>
				<br />
				<button class="button" type="submit">S'inscrire</button>
			</form>
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
			email: "",
			lastname: "",
			firstname: "",
			password: "",
		}
	},
	methods: {
		submitSignupForm() {
			axios.post('http://127.0.0.1:3000/api/auth/signup', {
				email: this.email,
				lastname: this.lastname,
				firstname: this.firstname,
				password: this.password,
			}).then(response => {
				console.log(response);
				this.$router.push('/Login')
				alert("account created");
			}).catch(error => {
				console.log(error);
			})
		}
	}
};
</script>

<style scoped>
.template {
	background: #ffd7d7;
}

#signup_form {
	display: flex;
	flex-direction: column;
	align-content: center;
	text-align: center;
	padding: 10px 0 20px 0;
	margin-top: 10%;
	margin-bottom: 10%;
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
</style>
