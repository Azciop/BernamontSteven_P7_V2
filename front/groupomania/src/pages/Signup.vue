<template>
	<div id="app" class="template">
		<div id="signup_form">
			<h1>INSCRIPTION</h1>
			<p>
				Déjà membre ?<router-link to="/login"> > Cliquez ici &lt;</router-link>
			</p>
			<form @submit="postData" method="post">
				<div>
					<input type="text" name="email" placeholder="Adresse e-mail" v-model="posts.email" />
				</div>
				<br />
				<div>
					<input type="text" name="nom" placeholder="Nom" v-model="posts.lastname" />
				</div>
				<br />
				<div>
					<input type="text" name="prenom" placeholder="Prenom" v-model="posts.firstname" />
				</div>
				<br />
				<div>
					<input type="password" name="password" placeholder="Mot de passe" v-model="posts.password" />
				</div>
				<br />
				<button type="submit" class="button">S'inscrire</button>
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
			posts: {
				email: null,
				lastname: null,
				firstname: null,
				password: null,
			},
		};
	},
	methods: {
		postData(e) {
			axios
				.post(
					"http://127.0.0.1:3000/api/auth/signup ",

					{
						email: "",
						lastname: "",
						firstname: "",
						password: "",
					}
				)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			e.preventDefault();
		},
	},
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
