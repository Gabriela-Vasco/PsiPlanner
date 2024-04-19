<script>
import ClientsTable from '@/modules/clients/components/ClientsTable.vue'

export default {
  name: 'ClientsView',
  components: {
    ClientsTable
  },
  data () {
    return {
      today: '',
      headers: [
        {
          text: 'Cliente',
          value: 'client_name',
          align: 'center'
        },
        {
          text: 'Data de início',
          value: 'start_date',
          align: 'center'
        },
        {
          text: 'Horário',
          value: 'appointment_time ',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'payment_value',
          align: 'center'
        },
        {
          text: 'Situação',
          value: 'active',
          align: 'center'
        },
        {
          text: 'Histórico',
          value: 'psychological_records',
          align: 'center'
        }
      ],
      items: [
        {
          client_name: 'Maria Machado',
          start_date: '2024-04-15',
          appointment_time: '10:00',
          payment_value: 100.00,
          active: true
        },
        {
          client_name: 'Julia Pereira',
          start_date: '2024-04-16',
          appointment_time: '14:30',
          payment_value: 120.00,
          active: true
        },
        {
          client_name: 'Larissa Silva',
          start_date: '2024-04-17',
          appointment_time: '09:45',
          payment_value: 90.00,
          active: false
        }
      ]
    }
  }
}
</script>

<template>
    <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
        <ClientsTable
            :headers="headers"
            :items="items"
            class='mb-10 mt-5rem'
        />
    </v-card>
</template>
