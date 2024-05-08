<script>
import { EventBus } from '@/utils/EventBus.js'
import BaseModal from '@/components/BaseModal.vue'
// import ClientsAnotationsTable from './ClientsAnotationsTable.vue'
export default {
  components: {
    BaseModal
    // ClientsAnotationsTable
  },
  data () {
    return {
      dialog: false,
      item: {},
      headers: [
        {
          text: '',
          value: 'client_name',
          align: 'd-none'
        },
        {
          text: 'Data da sessão',
          value: 'session_date',
          align: 'center'
        },
        {
          text: 'Horário da sessão',
          value: 'session_time',
          align: 'center'
        },
        {
          text: 'Anotações',
          value: 'file_records',
          align: 'center'
        }
      ],
      items: [
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        },
        {
          client_name: 'Maria Machado',
          session_date: '17/04/2024',
          session_time: '9:00'
        }
      ]
    }
  },
  created () {
    EventBus.$on('openItemModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openItemModal', this.openModal)
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
                  v-model="item.appointment_time"
                  label="Sessão"
                  placeholder="9:00"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="item.start_date"
                  label="Data de início"
                  placeholder="07/05/2024"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="item.payment_value"
                  label="Valor"
                  placeholder="R$100,00"
                  outlined
                  dense
                ></v-text-field>
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
