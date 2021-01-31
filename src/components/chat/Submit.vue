<template>
	<div class="submit-container">
		<span class="attachment">
			<i class="fas fa-paperclip"></i>
		</span>
		<input 
			type="text" 
			v-model="message" 
			@keyup.enter="sendMessage" 
			placeholder="Enter your message here">
		<button 
			@click="sendMessage">
			Send 
			<i class="fas fa-paper-plane"></i>
		</button>
	</div>
</template>

<script>
import { db } from '../../db.js'
import firebase from 'firebase'

export default {
  name: 'ChatSubmit',
  props: ['authUser', 'serverKey', 'chatUser', 'chatRoomId'],
  data () {
    return {
      message: ''
    }
  },
  methods: {
  	sendMessage() {
  		if (this.message != '') {
  			db.collection("messages")
	  			.add({
				    message: this.message,
				    time: Date.now(),
				    userId: this.authUser.userId,
				    chatRoomId: this.chatRoomId
				})
	  			.then((e) => {
					if (this.authUser.notificationId) {
						this.sendNotification()
					}
					this.message = ''
				})
  		} else {
  			console.log('toast message here')
  		}
  	},
  	sendNotification() {
  		var key = this.serverKey;
		var to = this.chatUser.notificationId;
		var notification = {
		  'title': 'Message From ' + this.authUser.name,
		  'body': this.message,
		  'icon': this.authUser.image,
		  'click_action': 'https://glass-chat.jorofo.dev/#/chat/' + this.authUser.userId
		};

		fetch('https://fcm.googleapis.com/fcm/send', {
		  'method': 'POST',
		  'headers': {
		    'Authorization': 'key=' + key,
		    'Content-Type': 'application/json'
		  },
		  'body': JSON.stringify({
		    'notification': notification,
		    'to': to
		  })
		}).then(function(response) {
		  console.log('Push Notification Sent!');
		}).catch(function(error) {
		  console.error(error);
		})
  	},
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.attachment {
		display:flex;
		align-items:center;
		margin-right:20px;
		color:rgba(138, 146, 165, 1);
		font-size:20px;
	}
	.submit-container {
		box-sizing:border-box;
		padding:20px;
		border-radius:20px;
		background: #fafcff;
		box-shadow:0px 0px 4px rgba(226, 229, 234, 1);
		display:flex;
		background: -moz-linear-gradient(top, #fafcff 0%, #ffffff 100%);
		background: -webkit-linear-gradient(top, #fafcff 0%,#ffffff 100%);
		background: linear-gradient(to bottom, #fafcff 0%,#ffffff 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fafcff', endColorstr='#ffffff',GradientType=0 );
	}
	.submit-container input {
		border:0;
		box-shadow:0px 0px 3px rgba(138, 146, 165, 1);
		width:100%;
		height:35px;
		border-radius:5px;
		box-sizing:border-box;
		padding:0 15px;
		margin-right:20px;
	}
	.submit-container button {
		background:#014DFB;
		border-radius:5px;
		border:0;
		padding:0 15px;
		color:#fff;
		font-weight:bold;
		display:flex;
		align-items:center;
	}
	.submit-container button i {
		margin-left:5px;
	}
</style>
