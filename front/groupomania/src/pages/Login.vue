<template>
    <div id="app">
        <div id="signup_form" class="template">
            <h1>CONNEXION</h1>
            <p>Pas encore membre ? <router-link to="/signup"> > Cliquez ici &lt; </router-link>
            </p>
            <form>
                <div>
                    <input type="text" name="email" placeholder="Adresse e-mail">
                </div>
                <br>
                <div>
                    <input type="password" name="password" placeholder="Mot de passe">
                </div>
                <br>
                <button type="submit" class="button">Se connecter</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "login"
}
</script>

<style scoped>
.template {
	background-color: #ffd7d7;
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
	background: linear-gradient(to bottom right,  #4e5166 ,#fd2d01, #4e5166);
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
	color:black;
	background: linear-gradient(to top right, #fd2d01, #4e5166 ,#fd2d01);
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