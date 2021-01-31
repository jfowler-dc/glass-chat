<template>
	<authContainer>
		<h1>Sign Up</h1>
    <div class="input-container">
      <input 
        v-model="email" 
        type="text" 
        placeholder="Email">
    </div>
    <div class="input-container">
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password">
    </div>
    <div class="input-container">
      <input 
        v-model="name" 
        type="text" 
        placeholder="Name">
    </div>
    <div class="input-container">
      <input 
        v-model="image" 
        type="text" 
        placeholder="Image Link">
    </div>
    <div class="input-container">
      <button @click="signUp">Sign Up</button>
    </div>
    <p>Already have an account? Click <router-link to="/login">here</router-link> to login.</p>
	</authContainer>
</template>

<script>

import firebase from 'firebase'
import { db } from '../../db.js'
import authContainer from './AuthContainer'


export default {
  name: 'SignUp',
  props: [],
  data () {
    return {
      email: '',
      password: '',
      name: '',
      image: ''
    }
  },
  methods: {
  	signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            firebase.firestore().collection("users")
              .doc(user.user.uid)
              .set({
                name: this.name,
                userId: user.user.uid,
                email: this.email,
                image: this.image
              })
            this.$router.replace('chat')
          },
          (err) => {
            console.log(err)
            alert('Oops: ' + err.message)
          }
      )
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
