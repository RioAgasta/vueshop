import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import EditProduct from '../views/EditProduct.vue'
import AddProduct from '../views/AddProduct.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'productlist',
    component: ProductView
  },
  {
    path: '/editproduct/:id',
    name: 'editproduct',
    component: EditProduct
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: AddProduct
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
