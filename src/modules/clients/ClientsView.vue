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
          value: 'appointment_time',
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
          start_date: '17/04/2024',
          appointment_time: '9:00',
          payment_value: 100.00,
          active: true
        },
        {
          client_name: 'Julia Pereira',
          start_date: '17/04/2024',
          appointment_time: '9:00',
          payment_value: 120.00,
          active: true
        },
        {
          client_name: 'Larissa Silva',
          start_date: '17/04/2024',
          appointment_time: '9:00',
          payment_value: 90.50,
          active: false
        }
      ]
    }
  }
}
</script>
<template>
    <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
        <v-btn text outlined class="mt-10 mr-10 align-self-end btn-primary-dark white--text">
          <v-icon>mdi-plus</v-icon>
          Novo cliente
        </v-btn>
        <ClientsTable
            :headers="headers"
            :items="items"
            class='mb-10 mt-5'
        />
    </v-card>
</template>
