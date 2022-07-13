	<template>
	<div id="app">
		<div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.svg" />
			<ul id="ul-nav">
				<li>
					<router-link class="text-decoration cursor-pointer" to="/accueil">Accueil
					</router-link>
				</li>
				<li>
					<p class="text-decoration cursor-pointer" v-on:click="logOut">Se déconnecter</p>
				</li>
			</ul>
		</div>
		<div class="pannel">

			<div class="userInfos">
				<p>{{ user.lastname }}</p>
				<p>{{ user.firstname }}</p>
				<p>{{ user.email }}</p>
			</div>
			<div class="center-sendbutton">

				<div>
					<transition name="slide" appear>
						<div class="modal" v-if="showModal">
							<font-awesome-icon class="close_modify-infos" @click="showModal = false"
								icon="fa-solid fa-circle-xmark" />
							<form class="modify-user-info">
								<div>
									<input type="text" placeholder="Changer de prénom" />
								</div>
								<br />
								<div>
									<input type="text" placeholder="Changer de nom de famille" />
								</div>
								<br />
								<div>
									<input type="email" placeholder="Changer d'adresse mail" />
								</div>
								<br />
								<div>
									<input type="text" placeholder="Changer de mot de passe" />
								</div>
								<br />
							</form>
							<button class="validate-modify-button">Modifier mes informations</button>
						</div>
					</transition>
				</div>
				<button class="button" @click="showModal = true">Modifier mes informations</button>

				<button class="button" type="submit" v-on:click="deleteAccount">Supprimer mon compte</button>
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
			showModal: false,
			user: {
				email: "",
				lastname: "",
				firstname: ""
			},


		};
	},
	mounted() {
		this.getUser();
	},
	methods: {
		getUser() {
			axios
				.get("http://127.0.0.1:3000/api/auth/read", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log("response", response);
					this.user = response.data;
				})
				.catch((error) => console.log(error));
		},
		deleteAccount() {
			axios
			.delete("http://127.0.0.1:3000/api/auth/", {
				headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
			})
			.then(() => {
				this.getUser();
				localStorage.clear();
			this.$router.push('/login');
			})
			.catch((error) => console.log(error));
		},
		logOut() {
			localStorage.clear();
			this.$router.push('/login');
		},
	}
}
</script>

<style scoped>
.modal {
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

.text-decoration {
	text-decoration: none;
	color: black;
	font-weight: bold;
}

.text-decoration:hover {
	color: #FD2D01;
}

.cursor-pointer{
	cursor: pointer;
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

	width: 100%;
	max-width: 400px;
	background-color: #ffd7d7;
	border-radius: 20px;
	text-align: center;
	margin-top: 30px;
	font-weight: bold;
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
	margin-right: 10px;
}

.button:hover {
	box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
}


input {
	text-align: center;
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

.validate-modify-button {
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

.validate-modify-button:hover {
	color: black;
	background: linear-gradient(to top right, #fd2d01, #4e5166, #fd2d01);
}

.close_modify-infos {
	position: absolute;
	right: 0px;
	top: 0px;
	height: 30px;
	padding: 5px 5px;
	cursor: pointer;
	color: #FD2D01;
}

.close_modify-infos:hover {
	filter: brightness(85%);
}
</style>