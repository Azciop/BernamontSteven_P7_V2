<template>
	<div id="app">
		<div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.svg" />
			<ul id="ul-nav">
				<li>
					<router-link class="text-decoration" to="/account">Mon compte
					</router-link>
				</li>
				<li>
					<p class="text-decoration cursor-pointer" v-on:click="logOut">Se déconnecter</p>
				</li>
			</ul>
		</div>
		<div id="create-post">
			<button class="create-post_button text-left" @click="showModal = true">Quoi de neuf, {{ user.firstname }}
				?</button>
			<transition name="fade" appear>
				<div class="modal-overlay" v-if="showModal" @click="showModal = false">

				</div>
			</transition>
			<transition name="slide" appear>
				<div class="modal" v-if="showModal">
					<span>
						<h2 class="center-text">Créer une publication</h2>
						<div class="close-post_button" @click="showModal = false">
							<font-awesome-icon class="close_create_post" icon="fa-solid fa-circle-xmark" />
						</div>
					</span>
					<form @submit.prevent="submitCreatePost" enctype="multipart/form-data">
						<div>
							<input class="textPost" name="createPost" placeholder="Quoi de neuf ?" v-model="content" />
						</div>
						<div class="center-sendbutton">
							<input type="file" class="publishPost" v-on:change="selectFile" ref="file" />
							<button type="submit" class="publishPost">Publier</button>
						</div>
					</form>
				</div>
			</transition>
		</div>
		<div class="feed reverseoPosts ">
			<div class="post" :key="post._id" v-for="post in posts">
        
			<button @click="showModifyPost = true" class="button button-modify-post">Modifier</button>
            <transition name="fade" appear>
				<div class="modal-overlay" v-if="showModifyPost" @click="showModifyPost = false">

				</div>
			</transition>
            <transition name="slide" appear>
				<div class="modifiyPostModal" v-if="showModifyPost">
					<span>
						<h2 class="center-text">Modifier votre publication</h2>
						<div class="close-post_button" @click="showModifyPost = false">
							<font-awesome-icon class="close_create_post" icon="fa-solid fa-circle-xmark" />
						</div>
					</span>
					<form @submit.prevent="submitCreatePost" enctype="multipart/form-data">
						<div>
							<input class="textPost" name="createPost" placeholder="Quoi de neuf ?" v-model="content" />
						</div>
						<div class="center-sendbutton">
							<input type="file" class="publishPost" v-on:change="selectFile" ref="file" />
							<button type="submit" class="publishPost">Modifier</button>
						</div>
					</form>
				</div>
			</transition>
				<button v-on:click.prevent="deletePost(post._id)" title="Supprimer ce post !"
					class="delete-post-button">
					
					<font-awesome-icon class="delete-post-icon" icon="fa-solid fa-circle-xmark" />
				</button>
				<p class="authorName">{{ post.lastname }} {{ post.firstname }}</p>

				<p class="authorText"> {{ post.content }} </p>
				<div >
					<img class="postImg" v-if=" post.imageUrl != ('http://127.0.0.1:3000undefined') " :src="post.imageUrl" />
				</div>
				<div class="like-section">
					<div class="like-setup">
						<p class="likes">{{ post.likes }} like !</p>
						<button type="submit" title="Aimer ce post !" class="button">
							<font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like !
						</button>
					</div>
					<div class="like-setup">
						<p class="likes">{{ post.dislikes }} dislike !</p>
						<button type="submit" title="Ne pas aimer ce post !" class="button">
							<font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike !
						</button>
					</div>
				</div>

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
	name: "accueil",
	data() {
		return {
			file: "",
			content: "",
			showModal: false,
			showModifyPost: false,
			posts: null,
			user: {
				firstname: "",
				lastname: "",
			},

		};
	},
	methods: {
		selectFile() {
			this.file = this.$refs.file.files[0];
		},
		async submitCreatePost() {
			const formData = new FormData();
			formData.append('image', this.file);
			formData.append('content', this.content);
			formData.append('firstname', localStorage.getItem("firstname"));
			formData.append('lastname', localStorage.getItem("lastname"));
			formData.append('userId', localStorage.getItem("userId"));
			await axios.post("http://127.0.0.1:3000/api/post",
				formData,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					}
				}).then(
					console.log(formData),
					this.content = "",
					this.file = "",
				).then((response) => response.status >= 200 || response.status <= 201 ? location.reload(true) : console.log(response.statusText))
				.catch(error => console.log(error));
		},
		logOut() {
			localStorage.clear();
			this.$router.push('/login');
		},
		deletePost(id) {
			axios
				.delete("http://127.0.0.1:3000/api/post/" + id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					}
				})
				.then(() => {
					this.getAllPost();
				})
				.catch((error) => console.log("error", error));
		},
		logOut() {
			localStorage.clear();
			this.$router.push('/login');
		},
		getUser() {
			axios
				.get("http://127.0.0.1:3000/api/auth/read", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log("getUser", response);
					this.user = response.data;
				})
				.catch((error) => console.log(error));
		},
		getAllPost() {
			axios
				.get('http://127.0.0.1:3000/api/post')
				.then((response) => {
					console.log("getPosts ", response.data);
					this.posts = response.data;
				}).catch(error => {
					console.log(error);
				})
		},
	},
	mounted() {
		this.getUser();
		this.getAllPost();
	},
}


</script>

<style scoped>
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

#ul-nav {
	list-style: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 35%;
}

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

#create-post {
	margin: 20px 0;
	display: flex;
	justify-content: center;

}

.create-post_button {
	text-align: left !important;
	position: relative;
	display: flex;
	align-items: center;
	align-content: center;
	width: 50vw;
	border-radius: 30px;
	cursor: pointer;
	padding: 15px 25px;
	background-color: #FFD7D7;
	font-size: 1rem;
	transition: 0.4s ease-out;
}

.create-post_button:hover {
	box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 98;
	background-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;
	width: 100%;
	max-width: 400px;
	background-color: #4E5166;
	border-radius: 20px;
}

.center-text {
	display: flex;
	justify-content: center;
}

.close_create_post {
	position: absolute;
	right: 0px;
	top: 0px;
	height: 30px;
	padding: 5px 5px;
	cursor: pointer;
	color: #FD2D01;
}

.close_create_post:hover {
	filter: brightness(85%);
}

.textPost {
	border-radius: 35px;
	border-style: none;
	font-size: 1em;
	font-weight: bold;
	height: 50px;
	padding: 0 20px 0 20px;
	box-shadow: 3px 3px 30px #FFD7D7;
	margin: 0;
	margin-left: 5%;
	width: 80%;
	margin-bottom: 25px;
}

.add-image-input {
	display: none;
}

.add-image:hover {
	box-shadow: 3px 3px #FD2D01;
	cursor: pointer;
}

.add-image {
	font-weight: bold;
	font-size: 1em;
	margin-bottom: 10px;
	background-color: #FFD7D7;
	border: none;
	padding: 10px;
	border-radius: 20px;
	cursor: pointer;
}

.center-sendbutton {
	margin: 0 5% 2% 5%;
	display: flex;
	flex-direction: column;
}

.publishPost {
	font-weight: bold;
	font-size: 1em;
	margin-bottom: 5px;
	background-color: #FFD7D7;
	border: none;
	padding: 10px;
	border-radius: 20px;
	cursor: pointer;
}

.publishPost:hover {
	box-shadow: 3px 3px #FD2D01;
	cursor: pointer;
}

.feed {
	display: flex;
	justify-content: center;
	text-align: center;
	flex-direction: column;
	align-items: center;
}

.modifiyPostModal{
    position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;
	width: 100%;
	max-width: 400px;
	background-color: #4E5166;
	border-radius: 20px;
}
.post {
	position: relative;
	width: 575px;
	border-radius: 30px;
	background-color: #FFD7D7;
	margin-bottom: 20px;
}

.authorName {
	text-align: left !important;
	margin-left: 20px;
	font-weight: bold;
}

.authorText {
	margin: 20px;
	text-align: left !important;
}

.postImg {
	box-sizing: border-box;
	object-fit: cover;
	object-position: center;
	width: 100%;
	max-height: 400px;
	margin: 0px 0px 20px 0px;
}

.like-section {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: left;
	border-bottom: black;
	font-size: 15px;
}

.like-setup {
	display: flex;
	flex-direction: row;
}

.likes {
	text-align: left !important;
	margin: 0 20px 0px 20px;
	font-weight: bold;
}

.button {
	margin: 0 20px 20px 0;
	padding: 5px;
	border-radius: 5px;
	border-style: none;
	background: linear-gradient(to bottom right, #4e5166, #fd2d01, #4e5166);
	font-size: 1em;
	color: white;
	font-weight: bold;
	height: 25px;
	box-shadow: 3px 3px 20px #aaa;
	cursor: pointer;
	text-align: center;
}

.button:hover {
	color: #FFD7D7;
	background: linear-gradient(to top right, #fd2d01, #4e5166, #fd2d01);
}

.delete-post-button {
	position: absolute;
	right: 0px;
	top: 0px;
	background-color: transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	overflow: hidden;
	outline: none;

}

.delete-post-icon {
	height: 30px;
	padding: 10px 10px;
	cursor: pointer;
	color: #FD2D01;

}

.delete-post-icon:hover {
	filter: brightness(85%);
}

.button-modify-post {
	position: absolute;
	right: 60px;
	top: 15px;
	background-color: transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	overflow: hidden;
	outline: none;
	margin: 0;
	font-size: 12px;
}

.reverseoPosts {
	display: flex;
	flex-direction: column-reverse;
}

@media all and (max-width: 650px) {
	#app {
		max-width: 650px;
	}
	#nav {
		flex-direction: column;
    align-items: flex-start;
	
	}
	.logo {
		margin-left: auto;
		margin-right: auto;
		margin-top:16px;
		padding: 0;
		left: 0;
	}
	#ul-nav {
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 0;
	}
	.create-post_button {
		width: 575px;
	}
}
</style>
