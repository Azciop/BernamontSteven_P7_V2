<template>
	<div id="app">
			<nav>
				<img class="logo" src="../assets/icon-left-font-monochrome-black.svg" />
				<ul>
					<li>
						<router-link class="text-decoration" to="/account">Mon compte
						</router-link>
					</li>
					<li>
						<p class="text-decoration cursor-pointer" v-on:click="logOut">Se déconnecter</p>
					</li>
				</ul>
			</nav>
	</div>
</template>

<script>
export default {
	name: "accueil",
	data() {
		return {

		};
	},
	methods: {
		logOut(){
			localStorage.clear();
			this.$router.push('/login');
		}
	}
};
</script>

<style scoped>
.logo {
	width: 200px;
	position: relative;
	left: 20px;
}

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #FFD7D7;
}

nav ul {
	list-style: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 35%;
}

.cursor-pointer{
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
</style>
