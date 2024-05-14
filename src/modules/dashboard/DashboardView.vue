<script>
import { mapGetters, mapActions } from 'vuex'
import DashboardTable from '@/modules/dashboard/components/DashboardTable.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import Service from './Service.js'

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
          value: 'session_date',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'session_value',
          align: 'center'
        },
        {
          text: 'Confirmação',
          value: 'attended',
          align: 'center'
        },
        {
          text: 'Pagamento',
          value: 'payed',
          align: 'center'
        },
        {
          text: 'Ações',
          value: 'actions',
          align: 'center'
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
  },
  methods: {
    ...mapActions(['setSessions']),
    async fetchTodaySessions () {
      try {
        let data = await Service.list()
        data = data.filter(item => {
          return item.session_date === dayjs().format('DD/MM/YYYY')
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
    />
  </v-card>
</template>
