<script>
import DashboardTable from '@/modules/dashboard/components/DashboardTable.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'

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
          value: 'id_client',
          align: 'center'
        },
        {
          text: 'Horário',
          value: 'appointment_time',
          align: 'center'
        },
        {
          text: 'Confirmação',
          value: 'confirmation',
          align: 'center'
        },
        {
          text: 'Pagamento',
          value: 'payment',
          align: 'center'
        },
        {
          text: 'Anotações',
          value: 'anotations',
          align: 'center'
        }
      ],
      items: [{
        id_client: 1,
        appointment_time: '9:00',
        confirmation: false,
        payment: false
      },
      {
        id_client: 2,
        appointment_time: '9:00',
        confirmation: false,
        payment: false
      }]
    }
  },
  mounted () {
    dayjs.locale('pt-br')
    this.today = dayjs().utc().utcOffset(-3).format('DD, MMMM, YYYY')
    this.today = this.today.replaceAll(',', ' de')
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
