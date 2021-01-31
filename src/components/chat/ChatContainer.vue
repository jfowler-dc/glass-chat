<template>
	<div class="container">
		<div class="message-scroller" v-chat-scroll>
			<message 
				class="all-messages"
				v-for="(message, key) in getMessages"
				:key="key"
				:message="message.message"
				:image="message.image"
				:time="message.time"
				:uid="message.userId"
				:seen="message.seen"
				:authUser="authUser"
				:friends="friends">
			</message>
		</div>
		<submit 
			:authUser="authUser"
			:serverKey="serverKey"
			:chatUser="chatUser"
			:chatRoomId="chatRoomId">
		</submit>
	</div>
</template>

<script>
import message from './Message'
import submit from './Submit'

export default {
  name: 'ChatContainer',
  props: ['messages', 'authUser', 'friends', 'serverKey', 'conversations', 'chatUser', 'chatRoomId'],
  data () {
    return {
      documents: []
    }
  },
  methods: {
  	sortMessages(messages) {
  		return messages.sort((a, b) => {
			var keyA = new Date(a.time),
				keyB = new Date(b.time)
			if (keyA < keyB) return -1
			if (keyA > keyB) return 1
			return 0;
		});
  	},
  },
  computed: {
  	getMessages() {
  		return this.sortMessages(this.messages)
  	}
  },
  components: {
  	message,
  	submit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		width:100%;
		height:100%;
		border-radius:20px;
		background:#F3F6FB;
		box-sizing:border-box;
		padding:30px 20px;
		display:flex;
		flex-direction:column;
	}
	.message-scroller {
		overflow:scroll;
		height:100%;
		margin-bottom:30px;
	}
	.all-messages {}
</style>
