<script>
import ClientsTable from '@/modules/clients/components/ClientsTable.vue'
import ClientModal from './components/ClientModal.vue'

export default {
  name: 'ClientsView',
  components: {
    ClientsTable,
    ClientModal
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
      ],
      modalActive: false,
      modalText: ''
    }
  },
  methods: {
    openModal (itemId) {
      console.log('entrou na view')
      // Logic to find clicked item and update modal text
      const foundItem = this.items.find(item => item.id_client === itemId)
      this.modalText = `You clicked on item: ${foundItem.name}`
      this.modalActive = true
    }
  }
}
</script>
<template>
  <div class="pa-0 ma-0">
    <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
        <v-btn text outlined class="mt-10 mr-10 align-self-end btn-primary-dark white--text">
          <v-icon>mdi-plus</v-icon>
          Novo cliente
        </v-btn>
        <ClientsTable
            :headers="headers"
            :items="items"
            class='mb-10 mt-5'
            @open-modal="openModal"
        />
    </v-card>
    <ClientModal />
  </div>
</template>
