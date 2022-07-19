<template>
<div>
    <div id="nav">
			<img class="logo" src="../assets/icon-left-font-monochrome-black.svg" />
			<ul id="ul-nav">
                <li>
					<router-link class="text-decoration" to="/account">Mon compte
					</router-link>
				</li>
				<li>
					<router-link class="text-decoration" to="/accueil">Accueil
					</router-link>
				</li>
				<li>
					<p class="text-decoration cursor-pointer" v-on:click="logOut">Se déconnecter</p>
				</li>
			</ul>
		</div>
    <h1>
        Admin Dashboard
    </h1>
    <table>
  <tr class="usersInfo">
  <td>userId</td>
  <td>FirstName</td>
  <td>LastName</td>
  <td>isAdmin</td>
  <td>createdAt</td>
  <td>modifiedAt</td>
  </tr>
  <tr :key="user.userId" v-for="user in users">
  <td>{{user._id}}</td>
  <td>{{user.firstname}}</td>
  <td>{{user.lastname}}</td>
  <td>{{user.isAdmin}}</td>
  <td>{{user.created_at}}</td>
  <td>{{user.updated_at}}</td>
  </tr>
</table>
    </div>
</template>

<script>
import * as Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";



const app = Vue.createApp();
app.use(VueAxios, axios);

export default {
    name: "adminDashboard",
    data () {
        return {
            users: {
				_id: "",
				lastname: "",
				firstname: "",
				created_at: "",
				updated_at: "",
			},
        };
    },
    
        mounted() {
		 {
			axios
				.get('http://127.0.0.1:3000/api/auth/readAllUsers')
				.then((response) => {
					console.log("getUsers ", response);
					this.users = response.data;
				}).catch(error => {
					console.log(error);
				})
		};
}
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

.text-decoration {
	text-decoration: none;
	color: black;
	font-weight: bold;
}

.text-decoration:hover {
	color: #FD2D01;
}

.cursor-pointer {
	cursor: pointer;
}

table, th, td {
  border: 1px solid;
}

h1{
text-align: center;
}

table {
    width: 75%;   
     margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  font-weight: bold;
}

.btn {
    padding: 5px;
    font-weight: bold;
     display: flex;
     align-content: center;
     width: 100%;
     text-align: center;
     
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
}

</style>