	<template>
	<div id="app">
		<div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.svg" />
			<ul id="ul-nav">
				<li>
					<router-link class="text-decoration" to="/accueil">Accueil
					</router-link>
				</li>
				<li>
					<p class="text-decoration cursor-pointer" v-on:click="logOut">Se déconnecter</p>
				</li>
			</ul>
		</div>
		<div class="pannel">


			<div class="center-sendbutton">
				<button class="button">Changer mes informations</button>
				<button class="button" type="submit">Supprimer mon compte</button>
			</div>
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
	name: "account",
	data() {
		return {

		}
	},
	// async created() {
	// 	const response = await axios.get('http://127.0.0.1:3000/api/auth/read');

	// 	console.log(response);
	// },
	methods: {
		logOut() {
			localStorage.clear();
			this.$router.push('/login');
		},
	}
};
</script>

<style scoped>
.cursor-pointer {
	cursor: pointer;
}

.text-decoration {
	text-decoration: none;
	color: black;
	font-weight: bold;
}

.text-decoration:hover {
	color: #FD2D01;
}

#ul-nav {
	list-style: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 35%;
}

.pannel {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;
	width: 100%;
	max-width: 400px;
	background-color: #FFD7D7;
	border-radius: 20px;
}


.logo {
	width: 200px;
	position: relative;
	left: 20px;
}

#nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #FFD7D7;
}

.center-sendbutton {
	display: flex;
	justify-content: space-around;
	margin-bottom: 5%;
}

.button {
	border-radius: 35px;
	border-style: none;
	padding: 10px;
}

.button:hover {
	box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
}
</style>