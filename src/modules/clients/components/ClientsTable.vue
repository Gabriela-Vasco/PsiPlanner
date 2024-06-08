<script>
import { EventBus } from '@/utils/EventBus.js'
import ClientsService from '../ClientsService.js'

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
                <v-btn
                  small
                  rounded
                  icon
                  color="red darken-1"
                  :loading="item.loading"
                  @click="deleteClient(item)"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <!-- <template v-slot:item.psychological_records="{ item }">
                <div class="d-flex justify-content-center">
                  <v-btn
                  small
                  rounded
                  color="#83cfcb"
                  @click="openModal(item)"
                  >
                    <v-icon>mdi-file-cabinet</v-icon>
                </v-btn>
                </div>
            </template> -->
        </v-data-table>
    </div>
</template>
