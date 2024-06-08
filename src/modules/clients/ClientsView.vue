<script>
import { mapActions, mapGetters } from 'vuex'
import ClientsTable from '@/modules/clients/components/ClientsTable.vue'
import ClientModal from './components/ClientModal.vue'
import { EventBus } from '@/utils/EventBus.js'
import ClientsService from './ClientsService.js'

export default {
  name: 'ClientsView',
  components: {
    ClientsTable,
    ClientModal
  },
  data () {
    return {
      snackbarSuccessClients: false,
      snackbarFailureClients: false,
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
          text: 'Valor inicial',
          value: 'payment_value',
          align: 'center'
        },
        {
          text: 'Situação',
          value: 'active',
          align: 'center',
          width: '110px'
        },
        {
          text: 'Ações',
          value: 'actions',
          align: 'center'
        }
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
        const data = await ClientsService.list()
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
    <v-snackbar
      v-model="snackbarSuccessClients"
      timeout="2000"
      elevation="12"
      right
      absolute
      top
      color="success"
    >
      Requisição feita com sucesso!
    </v-snackbar>
    <v-snackbar
      v-model="snackbarFailureClients"
      timeout="2000"
      elevation="12"
      right
      absolute
      top
      color="red darken-2"
    >
      Houve um erro na requisição, tente novamente
    </v-snackbar>
    <v-card class="d-flex flex-column align-center my-10 card">
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
        @update='fetchClients'
        @snackbarSucessClients="snackbarSucessClients = true"
        @snackbarFailureClients="snackbarFailureClients = true"
      />
    </v-card>
    <ClientModal
      @update='fetchClients'
      @snackbarSucessClients="snackbarSuccessClients = true"
      @snackbarFailureClients="snackbarFailureClients = true"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 95%;
}
</style>
