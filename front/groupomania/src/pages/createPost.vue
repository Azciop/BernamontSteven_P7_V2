<template>
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
</template>

<script>
export default {
    data() {
        return {  
        }
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
    background-color: #FD2D01;
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
    color: #4E5166;
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

</style>