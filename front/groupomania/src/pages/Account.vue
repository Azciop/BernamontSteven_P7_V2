<template>
<div id="app">
        <div id="account-pannel">
			<ul>
				<li><a>Nom</a></li>
				<li>Prénom</li>
				<li>E-mail</li>
				<button>Changer mes informations</button>
				<button>Supprimer mon compte</button>
			</ul>
		</div>
    </div>
</template>

<script>
    export default {
	name: "account",
	data() {
		return {};
	},
};
</script>

<style scoped>
#account-pannel {
	background-color: #ffd7d7;
	display: flex;
	flex-direction: column;
	align-content: center;
	text-align: center;
	padding: 10px 0 20px 0;
	margin-top: 10%;
	margin-bottom: 10%;
}

ul li {
	text-decoration: none;
	color: black;
	font-weight: bold;
	list-style: none;
}
</style>