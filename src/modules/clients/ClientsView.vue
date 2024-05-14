<script>
import { mapActions, mapGetters } from 'vuex'
import ClientsTable from '@/modules/clients/components/ClientsTable.vue'
import ClientModal from './components/ClientModal.vue'
import ClientsAnotationsModal from './components/ClientsAnotationsModal.vue'
import { EventBus } from '@/utils/EventBus.js'
import Service from './Service.js'

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
      ]
    }
  },
  mounted () {
    this.fetchClients()
  },
  computed: {
    ...mapGetters(['getClients']),
    items () {
      return this.getClients
    }
  },
  methods: {
    ...mapActions(['setClients']),
    openClientModal () {
      EventBus.$emit('openClientModal')
    },
    async fetchClients () {
      try {
        const data = await Service.list()
        this.setClients(data)
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
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
          @click="openClientModal()"
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
    <ClientModal @update='fetchClients' />
    <ClientsAnotationsModal />
  </div>
</template>
