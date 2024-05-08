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
    openModal (item) {
      EventBus.$emit('openAnotationModal', item)
    }
  }
}
</script>
<template>
    <div class="w-100">
        <v-data-table
            class="data-table"
            :headers="headers"
            :items="items"
        >
            <template v-slot:item.session_date="{ item }">
                {{ item.session_date || ' - ' }}
            </template>
            <template v-slot:item.session_time="{ item }">
                {{ item.session_time || ' - ' }}
            </template>
            <!-- <template v-slot:item.file_records="{ item }">
                <div class="d-flex justify-content-center">
                  <v-btn
                  small
                  rounded
                  color="#83cfcb"
                  @click="openModal(item)"
                  >
                    <v-icon>mdi-file-edit</v-icon>
                </v-btn>
                </div>
            </template> -->
        </v-data-table>
    </div>
</template>
