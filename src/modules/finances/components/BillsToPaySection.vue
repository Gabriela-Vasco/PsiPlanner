<script>
import BillsToPayTable from '@/modules/finances/components/BillsToPayTable.vue'
import { EventBus } from '@/utils/EventBus'

export default {
  components: {
    BillsToPayTable
  },
  props: {
    billsToPay: { type: Array, default: () => [] }
  },

  data () {
    return {
      headers: [
        {
          text: 'Fornecedor',
          value: 'provider',
          align: 'center'
        },
        {
          text: 'Data de vencimento',
          value: 'due_date',
          align: 'center'
        },
        {
          text: 'Data de pagamento',
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
  methods: {
    openModal () {
      EventBus.$emit('openFinanceModal', { item: {}, type: 'billToPay' })
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
          Nova conta a pagar
        </v-btn>
        <BillsToPayTable
            :items='billsToPay'
            :headers='headers'
            @reloadBillsToPay="$emit('reloadBillsToPay')"
            @snackbarSucess="$emit('snackbarSucess')"
            @snackbarFailure="$emit('snackbarFailure')"
        />
    </div>
</template>
