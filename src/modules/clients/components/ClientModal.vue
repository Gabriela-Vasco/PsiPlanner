<script>
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
import BaseModal from '@/components/BaseModal.vue'
import ClientsService from '../ClientsService.js'

// import ClientsAnotationsTable from './ClientsAnotationsTable.vue'
export default {
  components: {
    BaseModal
    // ClientsAnotationsTable
  },
  data () {
    return {
      dialogClientModal: false,
      newClient: false,
      item: {
        client_name: '',
        start_date: '',
        payment_value: '',
        frequency: '',
        active: true
      },
      frequencies: [
        {
          text: 'Nenhuma',
          value: 'none'
        },
        {
          text: 'Semanal',
          value: 'weekly'
        },
        {
          text: 'Quinzenal',
          value: 'biweekly'
        },
        {
          text: 'Mensal',
          value: 'monthly'
        }
      ],
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
      items: []
    }
  },
  created () {
    EventBus.$on('openClientModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openClientModal', this.openModal)
  },
  methods: {
    ...mapActions(['addNewClient']),
    clear () {
      this.newClient = false
      this.item = {
        client_name: '',
        start_time: '',
        start_date: '',
        payment_value: '',
        frequency: '',
        active: true
      }
    },
    openModal (item) {
      this.clear()
      this.dialogClientModal = true
      if (item) {
        this.item = item
      } else {
        this.newClient = true
      }
    },
    closeModal () {
      this.dialogClientModal = false
    },
    formatClientData () {
      this.item = {
        client_name: this.item.client_name,
        start_date: this.item.start_date,
        payment_value: parseFloat(this.item.payment_value),
        active: this.item.active
      }
    },
    formatSessionData (client) {
      const newSession = {
        clientId: client.clientId,
        start: this.item.start_date,
        end: this.item.start_date,
        session_value: parseFloat(this.item.payment_value),
        confirmation: false,
        attended: false,
        payed: false,
        details: '',
        frequency: this.item.frequency,
        color: ''
      }

      return newSession
    },
    async saveNewClient () {
      try {
        this.formatClientData()
        await ClientsService.save(this.item)
        console.log(this.item)
      } catch (error) {
        console.error('Erro ao salvar: ', error)
      } finally {
        this.addNewClient(this.item)
        this.closeModal()
        this.$emit('update')
      }
    }
  }
}
</script>
<template>
    <BaseModal :dialog='dialogClientModal'>
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
          <h3 v-if="newClient">Novo cliente</h3>
          <h3 v-else>{{ item.client_name }}</h3>
      </template>
      <template #modal-header>
          <v-container class="d-flex flex-column mt-7">
            <v-row class="d-flex flex-column align-center">
              <v-col v-if="newClient" cols="10" class="my-0 py-0">
                <v-text-field
                  v-model="item.client_name"
                  label="Nome do cliente"
                  placeholder="Joana Silva"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field v-model="item.start_date" type="datetime-local" label="Data início" outlined dense></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-autocomplete
                v-model="item.frequency"
                :items="frequencies"
                label="Frequência"
                item-text="text"
                item-value="value"
                dense
                outlined
              />
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field
                  v-model="item.payment_value"
                  label="Valor"
                  placeholder="100"
                  prefix="R$"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-checkbox
                  v-model="item.active"
                  color="#0B132B"
                  label="Cliente ativo"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-btn
              color="#0B132B"
              class="align-self-end white--text"
              @click="saveNewClient"
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
