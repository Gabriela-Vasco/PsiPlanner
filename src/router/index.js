import Vue from 'vue'
import VueRouter from 'vue-router'
import AgendaView from '../modules/agenda/AgendaView'
import DashboardView from '../modules/dashboard/DashboardView'
import ClientsView from '../modules/clients/ClientsView'
import FinancesView from '../modules/finances/FinancesView'
import FilesView from '../modules/files/FilesView'
import LoginSignUpView from '../modules/login-signup/LoginSignUpView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginSignUpView
  },
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
    path: '/arquivos',
    name: 'arquivos',
    component: FilesView
  }
]

const router = new VueRouter({
  routes
})

export default router
