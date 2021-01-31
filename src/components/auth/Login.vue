<template>
	<authContainer>
		<h1>Sign In</h1>
	  	<div class="input-container">
	  		<input 
	  			v-model="email" 
	  			type="text" 
	  			placeholder="email">
	  	</div>
	  	<div class="input-container">
	  		<input 
	  			v-model="password" 
	  			@keyup.enter="login"
	  			type="password" 
	  			placeholder="password">
	  	</div>
	  	<div class="input-container">
	  		<button @click="login">Sign In</button>
	  	</div>
	  	<p>No account? Create <router-link to="/sign-up">one</router-link>!</p>
	</authContainer>
</template>

<script>
import authContainer from './AuthContainer'
import firebase from 'firebase'
import { db } from '../../db.js'

export default {
  name: 'Login',
  props: [],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
  	login() {
    	if (this.email != '' && this.password != '') {
    		firebase
	      		.auth()
	      		.signInWithEmailAndPassword(this.email, this.password)
	      		.then(
	      			(user) => {
		      			db.collection("users")
		      				.doc(user.user.uid)
		      				.update({
		        				lastLogin: Date.now()
		      				})
		      			this.$router.replace('chat')
		        	},
		        	(err) => {
		          		alert('Oops: ' + err.message)
		        	}
	      		)
    	} else {
    		console.log('toast message here')
    	}
  	}
  },
  computed: {
  	
  },
  components: {
  	authContainer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-container {
    margin-bottom:10px;
    width:100%;
  }
  .input-container input[type="text"], .input-container input[type="password"] {
    width:100%;
    height:35px;
    box-sizing:border-box;
    border:0;
    box-shadow:0px 0px 3px rgba(138, 146, 165, 1);
    padding: 0 15px;
    border-radius:5px;
    background:#fff;
  }
  .input-container button {
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
