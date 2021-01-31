<template>
	<div class="conversations-container">
		<div class="conversations-header">
			<h2>{{title}}</h2>
			<span class="user-counter">{{countUsers}}</span>
			<i 
				class="fas open-arrow fa-angle-up"
				v-if="users.length > 0 && open == true"
				@click="toggleOpen">
			</i>
			<i 
				class="fas open-arrow fa-angle-down"
				v-else
				@click="toggleOpen">
			</i>
		</div>
		<user 
			v-for="(user, key) in users" 
			v-if="users.length > 0 && open == true"
			:key="key"
			:name="user.name" 
			:image="user.image" 
			:userId="user.userId"
			:notifications="user.notifications">
		</user>
	</div>
</template>

<script>
import user from './User'

export default {
  name: 'ConversationsContainer',
  props: ['title', 'users', 'authUser'],
  data () {
    return {
    	open: true
    }
  },
  methods: {
  	setOpen() {
  		if (this.countUsers > 0) {
  			this.open = true
  		}
  	},
  	toggleOpen() {
  		if (this.open == true) {
  			this.open = false
  		} else {
  			this.open = true
  		}
  	}
  },
  created() {
  	this.setOpen()
  },
  computed: {
  	countUsers() {
  		return this.users.length
  	}
  },
  components: {
  	user
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.conversations-container {
		display:flex;
		align-items:flex-start;
		flex-direction:column;
	}
	.conversations-header {
		display:flex;
		align-items:center;
		width:100%;
	}
	.conversations-header h2 {
		color:#0F283F;
	}
	.conversations-header span.user-counter {
		margin-left:20px;
		font-weight:bold;
		background:#EBEDEF;
		padding:3px 10px;
		color:#506172;
		border-radius:50%;
	}
	.open-arrow {
		margin-left:auto;
		font-size:25px;
		color:#0F283F;
		cursor:pointer;
	}
</style>
