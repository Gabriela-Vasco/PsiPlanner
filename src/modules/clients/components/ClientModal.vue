<script>
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
import { uuid } from 'vue-uuid'
import BaseModal from '@/components/BaseModal.vue'
import ClientsService from '../ClientsService.js'
import AgendaService from '@/modules/agenda/AgendaService'
import dayjs from 'dayjs'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      dialogClientModal: false,
      newClient: false,
      loading: false,
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
      const newID = uuid.v1()
      return {
        id: newID,
        client_name: this.item.client_name,
        start_date: this.item.start_date,
        payment_value: parseFloat(this.item.payment_value),
        active: this.item.active
      }
    },
    formatSessionData (client) {
      const newSession = {
        clientId: client.id,
        start: client.start_date,
        end: dayjs(client.start_date).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        session_value: parseFloat(client.payment_value),
        confirmation: false,
        attended: false,
        payed: false,
        details: '',
        frequency: client.frequency,
        color: '#18b2b0'
      }

      return newSession
    },
    async saveNewSession (newSession) {
      try {
        const saveSessions = async (iterations, increment, unit) => {
          const date = dayjs(newSession.start)
          for (let i = 0; i < iterations; i++) {
            const newDate = date.add(i * increment, unit)
            const startDate = newDate.format('YYYY-MM-DD HH:mm:ss')
            const endDate = newDate.add(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
            const session = { ...newSession, start: startDate, end: endDate }
            await AgendaService.save(session)
          }
        }

        if (newSession.frequency === 'weekly') {
          await saveSessions(8, 1, 'week')
        } else if (newSession.frequency === 'biweekly') {
          await saveSessions(4, 2, 'week')
        } else if (newSession.frequency === 'monthly') {
          await saveSessions(2, 28, 'day')
        } else {
          await AgendaService.save(newSession)
        }
      } catch (error) {
        console.error('Erro ao salvar: ', error)
      }
    },
    async saveNewClient () {
      try {
        const newClient = this.formatClientData()
        await ClientsService.save(newClient)
        this.item = {
          ...this.item,
          id: newClient.id
        }
        const newSession = this.formatSessionData(this.item)
        console.log(newSession)
        await this.saveNewSession(newSession)

        this.$emit('snackbarSucessClients')
      } catch (e) {
        console.error('Erro ao salvar: ', e)
        this.$emit('snackbarFailureClients')
      } finally {
        this.addNewClient(this.item)
        this.closeModal()
        this.$emit('update')
        this.$emit('snackbarSucessClients')
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
              :loading="loading"
              @click="saveNewClient"
            >
              Salvar
            </v-btn>
          </v-container>
      </template>
    </BaseModal>
</template>
