<template>
	<div class="chat-container" 
		:class="{auth: isAuthUser(uid)}"
		:title="userName">
		<div class="image-container">
			<div class="image">
				<img :src="userImage" :alt="userName">
			</div>
			<span class="seen" v-if="seen == true">
			</span>
		</div>
		<div class="message-container">
			<div class="message">
				<span>{{message}}</span>
			</div>
			<span class="time">
				{{timestamp}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: ['message', 'time', 'uid', 'seen', 'authUser', 'friends'],
  data () {
    return {
    	timestamp: '',
    	intervalSpeed: 60000,
    	userImage: '',
    	userName: ''
    }
  },
  methods: {
  	isAuthUser(uid) {
  		if (uid == this.authUser.userId) {
  			return true
  		}
  	},
	timeSince(timestamp) {                        
		let seconds = Math.floor((new Date() - timestamp) / 1000)
		let interval = seconds / 31536000

		if (interval > 1) {
			return Math.floor(interval) + " yr ago"
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " mon ago"
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " day ago"
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + " hr ago"
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + " min ago"
		}
		return "a moment ago"
	},
	getUserImage() {
		if (this.authUser.userId == this.uid) {
			this.userImage = this.authUser.image
			this.userName = this.authUser.name
		} else {
			this.friends.find(e => {
				if (e.userId == this.uid) {
					this.userImage = e.image
					this.userName = e.name
				}
			})
		}
	}
  },
  created() {
  	this.timestamp = this.timeSince(this.time)
  	setInterval(() => {
  		this.timestamp = this.timeSince(this.time)
  	}, this.intervalSpeed)
  },
  mounted() {
  	this.getUserImage()
  },
  computed: {
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.chat-container {
		display:flex;
		align-items:flex-start;
		margin-bottom:10px;
		width:100%;
	}
	.chat-container:last-child {
		margin-bottom:0;
	}
	.chat-container.auth {
		justify-content:flex-end;
	}
	.chat-container.auth .image-container {
		order:2;
		margin-right:0;
		margin-left:15px;
	}
	.chat-container.auth .image-container span.seen {
		right:auto;
		left:-2px; 
	}
	.chat-container.auth span.time {
		margin-left:auto;
	}
	.chat-container.auth .message {
		background:#1A233B;
		box-shadow:0 0 0;
	}
	.chat-container.auth .message span {
		color:#fff;
	}
	.chat-container.auth .message-container {
		justify-content:flex-end;
		align-items:flex-end;
	}
	.image-container {
		position:relative;
		margin-right:15px;
	}
	.image {
		width:50px;
		height:50px;
		border-radius:50%;
		overflow:hidden;
	}
	.image img {
		max-width:100%;
	}
	span.seen {
		position:absolute; 
		right:-2px; 
		bottom:-6px;
		background:#60C6AE;
		border:3px solid #fff;
		width:10px;
		height:10px;
		border-radius:50%;
	}
	.message-container {
		display:flex;
		flex-direction:column;
		justify-content:flex-start;
		align-items:flex-start;
		position:relative;
		max-width:70%;
	}
	.message {
		background:#fff;
		box-sizing:border-box;
		padding:12px;
		border-radius:10px;
		margin-bottom:5px;
		box-shadow:0px 4px 4px rgba(226, 229, 234);
	}
	.message span {
		color:#757D8F;
	}
	span.time {
		color:#A5ACBB;
		font-size:10px;
	}
</style>
