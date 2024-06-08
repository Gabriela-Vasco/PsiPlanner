<script>
import BillsToReceiveTable from '@/modules/finances/components/BillsToReceiveTable.vue'
import { EventBus } from '@/utils/EventBus.js'
export default {
  components: {
    BillsToReceiveTable
  },

  data () {
    return {
      headers: [
        {
          text: 'Cliente',
          value: 'client',
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
          value: 'value',
          align: 'center'
        },
        {
          text: 'Situação',
          value: 'active',
          align: 'center'
        }
      ],
      items: []
    }
  },
  methods: {
    openModal () {
      EventBus.$emit('openFinanceModal')
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
            :items='items'
            :headers='headers'
        />
    </div>
</template>
