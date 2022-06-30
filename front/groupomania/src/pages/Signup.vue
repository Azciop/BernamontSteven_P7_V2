<template>
	<div id="app">
		<div id="signup_form">
			<h1>S'inscrire</h1>
			<p>
				Déjà membre ?<router-link to="/login">
					> Cliquez ici &lt;</router-link
				>
			</p>
			<form @submit="postData" method="post">
				<div>
					<input
						type="text"
						name="email"
						placeholder="Adresse e-mail"
						v-model="posts.email"
					/>
				</div>
				<br />
				<div>
					<input
						type="text"
						name="nom"
						placeholder="Nom"
						v-model="posts.lastname"
					/>
				</div>
				<br />
				<div>
					<input
						type="text"
						name="prenom"
						placeholder="Prenom"
						v-model="posts.firstname"
					/>
				</div>
				<br />
				<div>
					<input
						type="password"
						name="password"
						placeholder="Mot de passe"
						v-model="posts.password"
					/>
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
					"http://127.0.0.1:3000/api/auth/signup",
					
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
#signup_form {
	text-align: center;
}
a {
	color: blue;
	text-decoration: none;
}
</style>
