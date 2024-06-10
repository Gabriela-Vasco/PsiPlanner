<script>
import { mapActions } from 'vuex'
import BillsToReceiveTable from '@/modules/finances/components/BillsToReceiveTable.vue'
import ClientsService from '@/modules/clients/ClientsService.js'
import { EventBus } from '@/utils/EventBus.js'

export default {

  components: {
    BillsToReceiveTable
  },
  props: {
    billsToReceive: { type: Array, default: () => [] }
  },

  data () {
    return {
      headers: [
        {
          text: 'Cliente',
          value: 'id_client',
          align: 'center'
        },
        {
          text: 'Data da conta',
          value: 'due_date',
          align: 'center'
        },
        {
          text: 'Data de recebimento',
          value: 'payment_date',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'value'
        },
        {
          text: 'Situação',
          value: 'situation'
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

  methods: {
    ...mapActions(['setClients']),
    openModal () {
      EventBus.$emit('openFinanceModal', { item: {}, type: 'billToReceive' })
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
    <div class="d-flex flex-column">
        <v-divider class='mb-5'/>
        <v-btn
          color="#0B132B"
          class="mr-10 align-self-end mb-10 white--text"
          @click="openModal()"
        >
          <v-icon class="mr-2">mdi-plus</v-icon>
          Nova conta a receber
        </v-btn>
        <BillsToReceiveTable
          :items='billsToReceive'
          :headers='headers'
          @reloadBillsToReceive="$emit('reloadBillsToReceive')"
          @snackbarSucess="$emit('snackbarSucess')"
          @snackbarFailure="$emit('snackbarFailure')"
        />
    </div>
</template>
