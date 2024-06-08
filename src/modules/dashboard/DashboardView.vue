<script>
import { mapGetters, mapActions } from 'vuex'
import DashboardTable from '@/modules/dashboard/components/DashboardTable.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import AgendaService from '@/modules/agenda/AgendaService.js'
import ClientsService from '@/modules/clients/ClientsService.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: 'DashboardView',
  components: {
    DashboardTable
  },
  data () {
    return {
      today: '',
      headers: [
        {
          text: 'Cliente',
          value: 'clientId',
          align: 'center'
        },
        {
          text: 'Horário',
          value: 'session_time'
        },
        {
          text: 'Valor',
          value: 'session_value',
          align: 'center'
        },
        {
          text: 'Confirmação',
          value: 'confirmation',
          width: '140px'
        },
        {
          text: 'Pagamento',
          value: 'payed',
          width: '130px'
        },
        {
          text: 'Realizada',
          value: 'attended',
          width: '140px'
        }
        // {
        //   text: 'Anotações',
        //   value: 'anotations',
        //   align: 'center'
        // }
      ]
    }
  },
  computed: {
    ...mapGetters(['getSessions']),
    items () {
      return this.getSessions
    }
  },
  mounted () {
    dayjs.locale('pt-br')
    this.today = dayjs().utc().utcOffset(-3).format('DD, MMMM, YYYY')
    this.today = this.today.replaceAll(',', ' de')
    this.fetchTodaySessions()
    this.fetchClients()
  },
  methods: {
    ...mapActions(['setSessions', 'setClients']),
    async fetchClients () {
      try {
        const data = await ClientsService.list()
        this.setClients(data)
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
    },
    async fetchTodaySessions () {
      try {
        let data = await AgendaService.list()

        data = data.map(session => {
          return {
            ...session,
            session_time: session.session_time || dayjs(session.start).utc().utcOffset(-3).format('HH:mm')
          }
        })

        data = data.filter(item => {
          return dayjs(item.start).date() === dayjs().date()
        })

        this.setSessions(data)
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
    }
  }
}
</script>
<template>
  <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
    <h1 class="my-10 text-underline">{{today}}</h1>
    <DashboardTable
      :headers="headers"
      :items="items"
      class="mb-10"
      @update="fetchTodaySessions"
    />
  </v-card>
</template>
