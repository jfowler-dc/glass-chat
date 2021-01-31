import Vue from 'vue'
import Router from 'vue-router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'

import VueChatScroll from 'vue-chat-scroll'

import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import Main from '@/components/Main'

Vue.use(VueChatScroll)
Vue.use(firestorePlugin)
Vue.use(Router)

const router = new Router({
  routes: [
  	{
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
  	{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/chat',
      name: 'Main',
      component: Main,
      meta: {
      	requiresAuth: true
      }
    },
    {
      path: '/chat/:userId',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next('login');
		 
	else if (!requiresAuth && currentUser) next('chat'); 

	else next();
})


export default router;
