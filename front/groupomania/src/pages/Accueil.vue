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
			<button class="create-post_button text-left" @click="showModal = true" >Quoi de neuf, Steven ?</button>
			<transition name="fade" appear>
				<div class="modal-overlay" v-if="showModal" @click="showModal = false">

				</div>
			</transition>
			<transition name="slide" appear>
				 <div class="modal" v-if="showModal">
        <span><h2 class="center-text">Créer une publication</h2>
        <div class="close-post_button" @click="showModal = false">
            <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </div>
        </span>
        <form>
            <div>
                <input class="textPost" name="createPost" placeholder="Quoi de neuf, {{ firstname }}" />
            </div>
            <div class="center-sendbutton">
            <button class="add-image">Ajouter une image</button>
            <button class="publishPost">Publier</button>
            </div>
        </form>
    </div>
			</transition>
		</div>
		<div class="feed">
			<div class="post">
				<p class="authorName">Lastname Firstname</p>
				<p class="authorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit animi voluptas explicabo quas nostrum odit, esse excepturi odio numquam quia qui optio. Ea corporis distinctio itaque laboriosam atque veniam totam!</p>
				<div>
					<img class="postImg" src="../assets/image-attractive-960x540.jpg" />
				</div>
				<div class="like-section">
					<div class="like-setup">
					<p class="likes">5 like !</p>
					<button class="button"><font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like !</button>
					</div>	
					<button class="toggleComments button"  @click="showComments = true" >Voir les commentaires</button>
					
				</div>
				<div class="solid-border"></div>
				<div comment-section>
					<form class="create-comment">
						<input name="createComment" placeholder="Ecrivez un commentaire !"/>
						<button class="sendComment">Envoyer</button>
					</form>
					<div class="solid-border"></div>
					<transition name="fade" appear> 
						<div v-if="showComments" @click="showComments = false"></div>
						</transition>
						<transition name="slide" appear>
					<div class="postedCommentSection" v-if="showComments">
				<div class="comment">
					<p class="commentAuthorName">Lastname Firstname</p>
					<p class="commentAuthorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi nisi repudiandae quis iste illum recusandae praesentium, tenetur repellat ducimus.</p>
					<div class="solid-border"></div>
				</div>
				<div class="comment">
					<p class="commentAuthorName">Lastname Firstname</p>
					<p class="commentAuthorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi nisi repudiandae quis iste illum recusandae praesentium, tenetur repellat ducimus.</p>
					<div class="solid-border"></div>
				</div>
				</div></transition>
				</div>
			</div>
			<div class="post">
				<p class="authorName">Lastname Firstname</p>
				<p class="authorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit animi voluptas explicabo quas nostrum odit, esse excepturi odio numquam quia qui optio. Ea corporis distinctio itaque laboriosam atque veniam totam!</p>
				<div>
					<img class="postImg" src="../assets/image-attractive-960x540.jpg" />
				</div>
				<div class="like-section">
					<div class="like-setup">
					<p class="likes">5 like !</p>
					<button class="button"><font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like !</button>
					</div>	
					<button class="toggleComments button"  @click="showComments = true" >Voir les commentaires</button>
					
				</div>
				<div class="solid-border"></div>
				<div comment-section>
					<form class="create-comment">
						<input name="createComment" placeholder="Ecrivez un commentaire !"/>
						<button class="sendComment">Envoyer</button>
					</form>
					<div class="solid-border"></div>
					<transition name="fade" appear> 
						<div v-if="showComments" @click="showComments = false"></div>
						</transition>
						<transition name="slide" appear>
					<div class="postedCommentSection" v-if="showComments">
				<div class="comment">
					<p class="commentAuthorName">Lastname Firstname</p>
					<p class="commentAuthorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi nisi repudiandae quis iste illum recusandae praesentium, tenetur repellat ducimus.</p>
					<div class="solid-border"></div>
				</div>
				<div class="comment">
					<p class="commentAuthorName">Lastname Firstname</p>
					<p class="commentAuthorText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi nisi repudiandae quis iste illum recusandae praesentium, tenetur repellat ducimus.</p>
					<div class="solid-border"></div>
				</div>
				</div></transition>
				</div>
			</div>
		</div>
	</div>
</template>


<script>


export default {
	name: "accueil",
	data() {
		return {
			showModal: false,
			showComments: false,
		};
	},
	methods: {
		logOut() {
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

.fa-circle-xmark {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 30px;
    padding: 5px 5px;
    cursor: pointer;
    color: #FD2D01;
}
.fa-circle-xmark:hover {
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

.add-image{
    font-weight: bold;
    font-size: 1em;
    margin-bottom: 10px;
    background-color: #FFD7D7;
    border: none;
    padding: 10px;
    border-radius: 20px;
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
}

.feed {
	display: flex;
	justify-content: center;
	text-align: center;
	flex-direction: column;
	align-items: center;
}

.post {
	width: 50vw;
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
	align-items: center;
	border-bottom: black;
}

.like-setup {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.likes {
	text-align: left !important;
	margin: 0 20px 20px 20px;
	font-weight: bold;
}

.button {
	margin: 0 20px 20px 0;
	padding: 5px;
	border-radius: 5px;
	border-style: none;
	background: linear-gradient(to bottom right,  #4e5166 ,#fd2d01, #4e5166);
	font-size: 1em;
	color: white;
	font-weight: bold;
	height: 25px;
	box-shadow: 3px 3px 20px #aaa;
	cursor: pointer;
	text-align: center;
}

.button:hover {
	color:#FFD7D7;
	background: linear-gradient(to top right, #fd2d01, #4e5166 ,#fd2d01);
}

.solid-border { 
	border: 1px solid #4e5166;
	width: 95%; 
	margin: auto; 
	margin-bottom: 20px;
}

.create-comment {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
}

.create-comment input {
	border-radius: 35px;
	width: 50%;
	background: white;
	text-align: left;
	margin-bottom: 20px;
	margin-left: 20px;
	height: 25px;
	font-weight: bold;
}

.sendComment {
	padding: 5px;
	border-radius: 5px;
	border-style: none;
	background: linear-gradient(to bottom right,  #4e5166 ,#fd2d01, #4e5166);
	font-size: 1em;
	color: white;
	font-weight: bold;
	height: 25px;
	box-shadow: 3px 3px 20px #aaa;
	cursor: pointer;
	text-align: center;
	margin-right: 20px;
}

.sendComment:hover {
	color:#FFD7D7;
	background: linear-gradient(to top right, #fd2d01, #4e5166 ,#fd2d01);
}

.comment {
font-size: 15px;
}

.commentAuthorName {
	margin: 0;
	margin-bottom: 10px;
}

.commentAuthorText {
	margin: 5px 5px 20px 5px;
}

</style>
