<script>
import ClientsTable from '@/modules/clients/components/ClientsTable.vue'
import ClientModal from './components/ClientModal.vue'
import ClientsAnotationsModal from './components/ClientsAnotationsModal.vue'
import { EventBus } from '@/utils/EventBus.js'

export default {
  name: 'ClientsView',
  components: {
    ClientsTable,
    ClientModal,
    ClientsAnotationsModal
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
          text: 'Ações',
          value: 'actions',
          align: 'center'
        }
        // {
        //   text: 'Histórico',
        //   value: 'psychological_records',
        //   align: 'center'
        // }
      ],
      items: [
        {
          client_name: 'Maria Machado',
          start_date: '17/04/2024',
          appointment_time: '9:00',
          payment_value: 100.00,
          active: true,
          actions: ''
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
  },
  methods: {
    openModal () {
      EventBus.$emit('openItemModal')
    }
  }
}
</script>
<template>
  <div class="pa-0 ma-0">
    <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
        <v-btn
          color="#0B132B"
          class="mt-10 mr-10 align-self-end white--text"
          @click="openModal()"
        >
          <v-icon>mdi-plus</v-icon>
          Novo cliente
        </v-btn>
        <ClientsTable
            :headers="headers"
            :items="items"
            class='mb-10 mt-5'
        />
    </v-card>
    <ClientModal />
    <ClientsAnotationsModal />
  </div>
</template>
