<script>
import { EventBus } from '@/utils/EventBus.js'
export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  },
  methods: {
    formatMoney (money) {
      if (Number.isInteger(money)) {
        return 'R$ ' + String(money) + ',00'
      } else {
        return 'R$ ' + String(money).replace('.', ',').padEnd(5, '0')
      }
    },
    openModal (item) {
      EventBus.$emit('openItemModal', item)
    }
  }
}
</script>
<template>
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
            <template v-slot:item.time="{ item }">
                {{ item.time || ' - ' }}
            </template>
            <template v-slot:item.payment_value="{ item }">
                {{ formatMoney(item.payment_value) || ' - ' }}
            </template>
            <template v-slot:item.active="{ item }">
                <v-chip
                    :color="item.active ? '#71F79F' : '#F2542D'"
                >
                    {{ item.active? 'Ativo' : 'Inativo' }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <div class="d-flex justify-content-center">
                  <v-btn
                    small
                    rounded
                    icon
                    color="#0B132B"
                    @click="openModal(item)"
                  >
                      <v-icon>mdi-pencil-circle</v-icon>
                  </v-btn>
                </div>
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
