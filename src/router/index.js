import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProntuariosView from '../views/ProntuariosView.vue'
import AgendaView from '../views/AgendaView.vue'
import FinanceiroView from '../views/FinanceiroView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard-view',
    component: DashboardView
  },
  {
    path: '/agenda',
    name: 'agenda-view',
    component: AgendaView
  },
  {
    path: '/prontuarios',
    name: 'prontuarios-view',
    component: ProntuariosView
  },
  {
    path: '/financeiro',
    name: 'financeiro-view',
    component: FinanceiroView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
