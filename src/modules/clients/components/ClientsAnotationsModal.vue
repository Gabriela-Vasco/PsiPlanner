<script>
import { EventBus } from '@/utils/EventBus.js'
import BaseModal from '@/components/BaseModal.vue'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      dialog: false,
      item: {}
    }
  },
  created () {
    EventBus.$on('openAnotationModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openAnotationModal', this.openModal)
  },
  methods: {
    openModal (item) {
      this.dialog = true
      this.item = item
    },
    closeModal () {
      this.dialog = false
    }
  }
}
</script>
<template>
    <BaseModal :dialog='dialog'>
      <template #close>
          <v-btn
            icon
            color="black"
            class='align-self-end'
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </template>
      <template #modal-title>
          <h3>Anotações</h3>
      </template>
      <template #modal-header>
          <v-container>
            <v-row>
              <v-col>
                <p class="font-weight-medium">Cliente: {{ item.client_name }}</p>
                <p class="font-weight-medium">Sessão: {{ item.session_date }} - {{ item.session_time }}</p>
              </v-col>
            </v-row>
          </v-container>
      </template>
      <template #modal-content>
        <v-container>
        </v-container>
      </template>
    </BaseModal>
</template>

<style>

</style>
