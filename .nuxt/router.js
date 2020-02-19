import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3b730094 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _f6a0e104 = () => interopDefault(import('..\\pages\\boardcare.vue' /* webpackChunkName: "pages_boardcare" */))
const _70f4510b = () => interopDefault(import('..\\pages\\calculator.vue' /* webpackChunkName: "pages_calculator" */))
const _5084f5c2 = () => interopDefault(import('..\\pages\\common_questions.vue' /* webpackChunkName: "pages_common_questions" */))
const _ab1ad334 = () => interopDefault(import('..\\pages\\mainproducts.vue' /* webpackChunkName: "pages_mainproducts" */))
const _36d43ab6 = () => interopDefault(import('..\\pages\\process.vue' /* webpackChunkName: "pages_process" */))
const _32e80c03 = () => interopDefault(import('..\\pages\\quote.vue' /* webpackChunkName: "pages_quote" */))
const _0d522fce = () => interopDefault(import('..\\pages\\sidinginstall.vue' /* webpackChunkName: "pages_sidinginstall" */))
const _77bbb026 = () => interopDefault(import('..\\pages\\products\\_slug.vue' /* webpackChunkName: "pages_products__slug" */))
const _5b2adb59 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _3b730094,
    name: "about"
  }, {
    path: "/boardcare",
    component: _f6a0e104,
    name: "boardcare"
  }, {
    path: "/calculator",
    component: _70f4510b,
    name: "calculator"
  }, {
    path: "/common_questions",
    component: _5084f5c2,
    name: "common_questions"
  }, {
    path: "/mainproducts",
    component: _ab1ad334,
    name: "mainproducts"
  }, {
    path: "/process",
    component: _36d43ab6,
    name: "process"
  }, {
    path: "/quote",
    component: _32e80c03,
    name: "quote"
  }, {
    path: "/sidinginstall",
    component: _0d522fce,
    name: "sidinginstall"
  }, {
    path: "/products/:slug?",
    component: _77bbb026,
    name: "products-slug"
  }, {
    path: "/",
    component: _5b2adb59,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
