<template>
	<div class="main-container">
		<div class="conversation-container">
			<div class="logo">
				<img src="../assets/logo.png">
			</div>
			<authUser
				:authUser="authenticatedUser">
			</authUser>
			<conversationsContainer
				v-for="(conversation, key) in conversations"
				:key="key" 
				:title="conversation.title"
				:users="conversation.users"
				:authUser="authenticatedUser">
			</conversationsContainer>
		</div>
		<div class="chat-container">
			<chatContainer
				:messages="messages"
				:authUser="authenticatedUser"
				:friends="friends"
				:serverKey="serverKey"
				:chatUser="chatUser"
				:chatRoomId="chatRoomId">
			</chatContainer>
		</div>
		<div class="information-container">
			<informationContainer>
			</informationContainer>
		</div>
	</div>
</template>

<script>
import conversationsContainer from './conversations/ConversationsContainer'
import chatContainer from './chat/ChatContainer'
import informationContainer from './info/UserInformation'

import authUser from './conversations/AuthUser'

import { db } from '../db.js'
import firebase from 'firebase'

export default {
  name: 'Main',
  data () {
    return {
    	conversations: [
    		{
    			title: 'Online Friends',
    			users:[]
    		},
    		{
    			title: 'Offline Friends',
    			users:[]
    		}
    	],
    	messages: [],
	    authenticatedUser:{},
	    chatRoomId: '',
	    chatUser: [],
	    friends: [],
	    userToken: '',
	    serverKey: 'FIREBASE CLOUD MESSAGING SERVER KEY'
    }
  },
  methods: {
  	getOnlineFriends() {
  		db.collection('users')
			.where('userId', '!=', this.authenticatedUser.userId)
			.onSnapshot((querySnapshot) => {
				this.friends = []
				this.conversations[0].users = []
				querySnapshot.docs.map((doc) => {
	        		this.friends.push(doc.data())
	        		this.conversations[0].users.push(doc.data())
		    	})
  			})
  	},
  	getChatRoomId() {
  		this.chatRoomId = ''
  		let userIds = []
  		userIds.push(this.authenticatedUser.userId)
  		userIds.push(this.$route.params.userId)
  		userIds.sort()
  		userIds.forEach((e) => {
  			this.chatRoomId += e
  		})
  	},
  	getMessages() {  		
		this.getChatRoomId()
		db.collection('messages')
			.where("chatRoomId", "==", this.chatRoomId)
  			.orderBy('time', 'asc')
  			.onSnapshot((querySnapshot) => {
  				this.messages = []
  				querySnapshot.forEach((doc) => {
		            this.messages.push(doc.data())
		        })
  			})
	},
	getAuthUser() {
		firebase.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					db.collection('users')
						.where('userId', '==', user.uid)
						.onSnapshot((querySnapshot) => {
							querySnapshot.docs.map((doc) => {
								this.authenticatedUser = doc.data()
							})
		  					this.getOnlineFriends()
		  					this.getChatUser()
		  					this.getMessages()
		  					this.connectCloudMessaging()
		  				})
				}
  		})
  	},
  	getChatUser() {
  		this.chatUser = []
		firebase.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					db.collection('users')
						.where('userId', '==', this.$route.params.userId)
						.onSnapshot((querySnapshot) => {
							querySnapshot.docs.map((doc) => {
								this.chatUser = doc.data()
							})
			
		  				})
				}
	  		})
  		
  	},
  	connectCloudMessaging() {
  		const messaging = firebase.messaging()
  		messaging.requestPermission()
  			.then( () => {
  				console.log('Notification Permission Granted!')
  				return messaging.getToken()
  			})
  			.then( (token) => {
  				db.collection('users')
  					.doc(this.authenticatedUser.userId)
  					.set({
  						notificationId: token
  					}, {merge: true})
  			})
  			.catch( (err) => {
  				console.log('Cloud Messaging Error: Run on a live server.')
  			})
  	}
  },
  computed: {
  	
  },
  mounted() {
  	this.getAuthUser()
  },
  watch: {
    '$route.params.userId' (to, from) {
    	this.messages = []
    	this.getMessages()
    }, 
  },
  components: {
  	conversationsContainer,
  	chatContainer,
  	informationContainer,
  	authUser,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main-container {
		display:flex;
		height:100%;
		width:100%;
		box-sizing:border-box;
		padding:30px;
	}
	.conversation-container {
		padding-right:25px;
		width:25%;
		box-sizing:border-box;
		overflow:scroll;
		max-height:100%;
	}
	.chat-container {
		padding-left:25px;
		padding-right:25px;
		width:50%;
		box-sizing:border-box;
		max-height:100%;
	}
	.information-container {
		width:25%;
		box-sizing:border-box;
		padding-left:25px;
		max-height:100%;
	}
	.logo {
		margin-bottom:20px;
	}
	.logo img {
		max-height:60px;
	}
	@media screen and (max-width:650px) {
		.main-container {
			flex-direction:column;
		}
		.conversation-container {
			width:100%;
			flex: 0 0 100%;
			padding-right:0;
			margin-bottom:50px;
		}
		.chat-container {
			width:100%;
			padding-left:0;
			margin-bottom:30px;
		}
	} 
</style>
