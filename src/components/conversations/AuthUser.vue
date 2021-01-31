<template>
	<div class="auth-user">
		<div class="profile-picture">
			<img :src="authUser.image" />
		</div>
		<h2>{{authUser.name}}</h2>
		<p>{{authUser.userId}}</p>
		<button @click="logout">Logout</button>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ConversationsAuthUser',
  props: ['authUser'],
  data () {
    return {
      
    }
  },
  methods: {
  	logout() {
		firebase.auth()
			.signOut()
			.then(() => {
				this.$router.replace('/login')
			})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.auth-user {
		display:flex;
		flex-direction:column;
		align-items:center;
		padding:30px;
		border-radius:20px;
		border:1px solid #EFF4F9;
		background:#F5F8FD;
		margin-bottom:20px;
	}
	.profile-picture {
		width:100px;
		height:100px;
		border-radius:50%;
		overflow:hidden;
	}
	.profile-picture img {
		width:100%;
	}
	button {
	    background:#014DFB;
	    border-radius:5px;
	    border:0;
	    padding:0 15px;
	    color:#fff;
	    font-weight:bold;
	    display:flex;
	    align-items:center;
	    height:35px;
	    width:100%;
	    justify-content:center;
	    cursor:pointer;
	}
</style>
