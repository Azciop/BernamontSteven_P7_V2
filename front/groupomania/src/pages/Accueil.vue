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
						<router-link class="text-decoration" to="/login">Se déconnecter
						</router-link>
					</li>
				</ul>
			</nav>
	</div>
</template>

<script>
export default {
	name: "accueil",
	data() {
		return {};
	},
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

.text-decoration {
	text-decoration: none;
	color: black;
	font-weight: bold;
}

.text-decoration:hover {
	color: #FD2D01;
}
</style>
