import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import Tags from '../views/Tags.vue'
import Edit from '../views/Edit.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

//route guards
import { auth } from '@/firebase/config';

function requireAuth(to, form, next){
  let user = auth.currentUser
  if(!user)
  {
    next({ name: 'Login' })
  }
  else
  {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: requireAuth
  },
  {
    path: '/tags/:tag',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter: requireAuth
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
