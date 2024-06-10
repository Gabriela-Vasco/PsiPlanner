<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { EventBus } from '@/utils/EventBus'
import FinancesService from '../FinancesService'

export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  },
  data () {
    return {
      paymentSituations: {
        pending: 'Pendente',
        paid: 'Pago',
        late: 'Atrasado'
      },
      paymentSituationsColors: {
        pending: 'orange',
        paid: 'green',
        late: 'red'
      }
    }
  },

  computed: {
    ...mapGetters(['getClients']),
    clients () {
      let clients = this.getClients
      clients = clients.reduce((acc, client) => {
        acc[client.id] = client.client_name
        return acc
      }, [])

      return clients
    }
  },

  methods: {
    editItem (item) {
      EventBus.$emit('openFinanceModal', { item: item, type: 'billToReceive' })
    },
    async deleteItem (bill) {
      try {
        await FinancesService.deleteBillToReceive(bill)
        this.$emit('snackbarSucess')
      } catch (e) {
        console.error(e)
        this.$emit('snackbarFailure')
      } finally {
        this.$emit('reloadBillsToReceive')
      }
    },
    formatMoney (value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    formatDate (date) {
      if (date) {
        return dayjs(date)?.$d?.toLocaleDateString()
      }
    }
  }
}
</script>
<template>
  <div class='mx-10'>
    <!-- eslint-disable vue/valid-v-slot -->
    <v-data-table
        class="data-table"
        :headers="headers"
        :items="items"
    >
      <template v-slot:item.id_client="{ item }">
        {{ clients[item.id_client] || ' - ' }}
      </template>
      <template v-slot:item.due_date="{ item }">
          {{ formatDate(item.due_date) || ' - ' }}
      </template>
      <template v-slot:item.payment_date="{ item }">
        {{ formatDate(item.payment_date) || ' - ' }}
      </template>
      <template v-slot:item.value="{ item }">
        {{ formatMoney(item.value) || ' - ' }}
      </template>
      <template v-slot:item.situation="{ item }">
        <span>
          <v-chip
              :color="paymentSituationsColors[item.situation]"
              text-color="white"
          >
              {{ paymentSituations[item.situation] || ' - ' }}
          </v-chip>
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          class="mr-2"
          color="blue darken-2"
          @click="editItem(item)"
        >
          <v-icon>
          mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          color="red darken-1"
          @click="deleteItem(item)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
