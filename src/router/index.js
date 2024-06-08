import Vue from 'vue'
import VueRouter from 'vue-router'
import AgendaView from '../modules/agenda/AgendaView'
import DashboardView from '../modules/dashboard/DashboardView'
import ClientsView from '../modules/clients/ClientsView'
import FinancesView from '../modules/finances/FinancesView'
import LoginView from '../modules/login/LoginView'
import SignUpView from '../modules/signup/SignUpView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: AgendaView
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClientsView
  },
  {
    path: '/financeiro',
    name: 'financeiro',
    component: FinancesView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  routes
})

export default router
