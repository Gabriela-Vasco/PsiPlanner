import Vue from 'vue'
import VueRouter from 'vue-router'
import AgendaView from '../modules/agenda/AgendaView'
import DashboardView from '../modules/dashboard/DashboardView'
import ClientsView from '../modules/clients/ClientsView'
import FinancesView from '../modules/finances/FinancesView'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
