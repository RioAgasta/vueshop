import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import EditProduct from '../views/EditProduct.vue'
import AddProduct from '../views/AddProduct.vue'
import CartView from '../views/CartView.vue'
import DetailView from '../views/DetailView.vue'

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
  {
    path: '/cart',
    name: 'cartpage',
    component: CartView
  },
  {
    path: '/detail/:id',
    name: 'detailpage',
    component: DetailView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
