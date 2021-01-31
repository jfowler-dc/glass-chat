<template>
	<div class="auth-container">
		<div class="auth-window">
      <slot></slot>
    </div>
	</div>
</template>

<script>

export default {
  name: 'AuthContainer',
  props: [],
  data () {
    return {
      
    }
  },
  methods: {
  	
  },
  computed: {
  	
  },
  components: {
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .auth-container {
    display:flex;
    width:100%;
    height:100%;
    align-items:center;
    justify-content:center;
    flex-direction:column;
  }
  .auth-window {
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:30px;
    border-radius:20px;
    border:1px solid #EFF4F9;
    background:#F5F8FD;
    margin-bottom:20px;
    min-width:250px;
  }
</style>
