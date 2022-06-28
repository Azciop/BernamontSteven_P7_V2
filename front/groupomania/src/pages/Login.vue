<template>
<div id="app">
        <div id="signup_form">
            <h1>Connexion</h1>
            <p>Pas encore membre ? <router-link to="/signup"> > Cliquez ici &lt; </router-link></p>
            <form>
                <div>
                    <input type="text" name="email" placeholder="Adresse e-mail">
                </div>
                <br>
                <div>
                    <input type="password" name="password" placeholder="Mot de passe">
                </div>
                <br>
                <button class="button">Se connecter</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default{
        name : "login"
    }
</script>


    <style scoped>
    #signup_form {
    text-align: center;
    }
    a{
        color: blue;
        text-decoration: none;
    }
    </style>