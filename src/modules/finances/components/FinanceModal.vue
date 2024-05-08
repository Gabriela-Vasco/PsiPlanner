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
    EventBus.$on('openFinanceModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openFinanceModal', this.openModal)
  },
  methods: {
    clear () {
      this.item = {}
    },
    openModal (item) {
      this.clear()
      this.dialog = true
      if (item) {
        this.item = item
      }
    },
    closeModal () {
      this.dialog = false
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
          <h3>{{ item.client_name || "Novo cliente" }}</h3>
      </template>
      <template #modal-header>
          <v-container class="d-flex justify-content-start align-center">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.provider"
                  label="Fornecedor"
                  placeholder="Julia Machado"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="item.due_date"
                  label="Data de vencimento"
                  placeholder="07/05/2024"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="item.payment_date"
                  label="Data de pagamento"
                  placeholder="07/05/2024"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="item.value"
                  label="Valor"
                  placeholder="R$100,00"
                  outlined
                  dense
                ></v-text-field>
            </v-col>
            <v-col>
                <v-switch
                    v-model="item.active"
                    color="#0B132B"
                    label="Situação"
                ></v-switch>
            </v-col>
            </v-row>
            <v-btn
              color="#0B132B"
              class="align-self-end white--text"
            >
              Salvar
            </v-btn>
          </v-container>
      </template>
      <template #modal-content>
        <!-- <ClientsAnotationsTable :headers="headers" :items="items" class="mt-10"/> -->
      </template>
    </BaseModal>
</template>

<style>

</style>
