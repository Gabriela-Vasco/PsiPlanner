<script>
import { EventBus } from '@/utils/EventBus.js'
import ClientsService from '../ClientsService.js'
import AgendaService from '@/modules/agenda/AgendaService.js'
import FinancesService from '@/modules/finances/FinancesService.js'

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
      loading: false,
      selectedOpen: false
    }
  },

  methods: {
    openModal (item) {
      EventBus.$emit('openClientModal', item)
    },
    async deleteClient (item) {
      try {
        this.item = {
          ...item,
          loading: true
        }
        const sessions = await AgendaService.list()
        const sessionsToDelete = sessions.filter(session => session.clientId === item.id)

        const billsToReceive = await FinancesService.listBillsToReceive()
        const billsToDelete = billsToReceive.filter(bill => bill.id_client === item.id)
        try {
          if (sessionsToDelete.length > 0) {
            sessionsToDelete.forEach(async session => {
              await AgendaService.delete(session.id)
            })
          }

          if (billsToDelete.length > 0) {
            billsToDelete.forEach(async bill => {
              await FinancesService.deleteBillToReceive(bill)
            })
          }
        } catch (e) {
          console.error('Erro ao deletar sessões: ', e)
        }
        await ClientsService.delete(item)
      } catch (e) {
        console.error('Erro ao salvar: ', e)
        this.$emit('snackbarFailureClients')
      } finally {
        this.item = {
          ...item,
          loading: false
        }
        this.$emit('update')
        this.$emit('snackbarSucessClients')
      }
    },
    async updateClient (item) {
      try {
        this.item = {
          ...item,
          loading: true
        }
        await ClientsService.update(item, item.id)
        this.$emit('snackbarSucessClients')
      } catch (e) {
        console.error('Erro ao salvar: ', e)
        this.$emit('snackbarFailureClients')
      } finally {
        this.item = {
          ...item,
          loading: false
        }
      }
    },
    formatMoney (money) {
      if (Number.isInteger(money)) {
        return 'R$ ' + String(money) + ',00'
      } else {
        return 'R$ ' + String(money).replace('.', ',').padEnd(5, '0')
      }
    }
  }
}
</script>
<template>
  <!-- eslint-disable vue/valid-v-slot -->
    <div class="w-60">
        <v-data-table
            class="data-table"
            :headers="headers"
            :items="items"
        >
            <template v-slot:item.id_client="{ item }">
                {{ item.id_client || ' - ' }}
            </template>
            <template v-slot:item.start_date="{ item }">
                {{ item.start_date || ' - ' }}
            </template>
            <template v-slot:item.payment_value="{ item }">
              {{ formatMoney(item.payment_value) || ' - ' }}
            </template>
            <template v-slot:item.active="{ item }">
                <v-checkbox
                  v-model="item.active"
                  color="#71F79F"
                  class="ml-4"
                  @click="updateClient(item)"
                />
            </template>
            <template v-slot:item.actions="{ item }">
              <v-dialog
                v-model="selectedOpen"
                max-width="350"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    rounded
                    icon
                    v-on="on"
                    color="red darken-1"
                    @click="selectedOpen = true"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">Remover cliente</v-card-title>
                  <v-card-text>
                    <p>
                      Tem certeza que deseja excluir este cliente?
                    </p>
                    <p>
                      Essa ação excluirá todas as sessões e contas a receber associadas a ele.
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="neutral"
                      text
                      @click="selectedOpen = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      text
                      outlined
                      @click="deleteClient(item)"
                    >
                      Deletar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
        </v-data-table>
    </div>
</template>
