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
    EventBus.$on('openItemModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openItemModal', this.openModal)
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
            color="primary"
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </template>
      <template #modal-title>
          <h3>Prontuário</h3>
      </template>
      <template #modal-header>
          {{ item.client_name}} Prontuários
      </template>
      <template #modal-content></template>
    </BaseModal>
</template>

<style>

</style>
