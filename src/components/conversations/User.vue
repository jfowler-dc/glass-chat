<template>
	<router-link :to="'/chat/' + userId">
		<div class="conversations-user-container" :class="{active: activeUser}">
			<div class="image">
				<img :src="image">
			</div>
			<div class="name">
				<h3>{{name}}</h3>
			</div>
			<div class="notification" v-if="notifications">
				<span>{{notifications}}</span>
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
  name: 'ConverationsUser',
  props: ['image', 'name', 'notifications', 'userId'],
  data () {
    return {
      
    }
  },
  computed: {
  	activeUser() {
  		if (this.userId == this.$route.params.userId) {
  			return true
  		} else {
  			return false
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		display:flex;
		flex:0 0 100%;
		width:100%;
		text-decoration:none;
		margin-bottom:5px;
	}
	.conversations-user-container {
		width:100%; 
		box-sizing:border-box;
		padding:5px 20px;
		border-radius:15px;
		display:flex;
		align-items:center;
		cursor:pointer;
	}
	.conversations-user-container:last-child {
		margin-bottom:0;
	}
	.conversations-user-container.active, .conversations-user-container:hover {
		background:#F3F6FB;
	}
	.image {
		width:50px;
		height:50px;
		border-radius:50%;
		overflow:hidden;
		margin-right:15px;
	}
	.image img {
		max-width:100%;
	}
	.name {

	}
	.name h3 {
		color:#49637D;
	}
	.notification {
		margin-left:auto;
		padding:3px 9px;
		border-radius:50%;
		background:#EE5C60;
		display:flex;
		align-items:center;
		justify-content:center;
	}
	.notification span {
		color:#fff;
		font-weight:bold;
	}
</style>
