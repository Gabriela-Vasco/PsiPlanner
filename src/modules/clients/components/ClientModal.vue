<script>
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
import BaseModal from '@/components/BaseModal.vue'
import Service from '../Service.js'
import dayjs from 'dayjs'

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
      menuDate: false,
      menuTime: false,
      dateWithoutFormatting: '',
      item: {
        client_name: '',
        appointment_time: '',
        appointment_date: '',
        start_date: '',
        payment_value: '',
        active: false
      },
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
    console.log('aqui')
  },
  beforeDestroy () {
    EventBus.$off('openClientModal', this.openModal)
  },
  watch: {
    dateWithoutFormatting (val) {
      this.item.start_date = dayjs(val).format('DD/MM/YYYY')
    }
  },
  methods: {
    ...mapActions(['addNewClient']),
    clear () {
      this.newClient = false
      this.item = {
        client_name: '',
        start_date: '',
        active: false
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
        ...this.item,
        payment_value: parseFloat(this.item.payment_value),
        start_date: dayjs(this.item.start_date)
      }
    },
    async saveNewClient () {
      try {
        this.formatClientData()
        await Service.save(this.item)
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
                <v-menu
                  ref="menuTime"
                  v-model="menuTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="item.appointment_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.appointment_time"
                      label="Horário da sessão"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      placeholder="9:00"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuTime"
                    v-model="item.appointment_time"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menuTime.save(item.appointment_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-menu
                  ref="menuDate"
                  v-model="menuDate"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="item.start_date"
                      label="Data de início"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateWithoutFormatting"
                    no-title
                    scrollable
                    locale="pt"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field
                  v-model="item.payment_value"
                  label="Valor"
                  placeholder="R$100,00"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-switch
                  v-model="item.active"
                  color="#0B132B"
                  :label="item.active ? 'Cliente ativo' : 'Cliente inativo'"
                ></v-switch>
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
