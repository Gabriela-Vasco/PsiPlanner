<script>
import { mapActions, mapGetters } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
import AgendaService from '@/modules/agenda/AgendaService'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      dialogAgendaModal: false,
      newSession: false,
      loading: false,
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
      item: {
        clientId: '',
        start: '',
        end: '',
        session_value: '',
        confirmation: false,
        attended: false,
        payed: false,
        details: '',
        frequency: 'none',
        color: ''
      }
    }
  },

  created () {
    EventBus.$on('openAgendaModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openAgendaModal', this.openModal)
  },
  computed: {
    ...mapGetters(['getClients']),
    clients () {
      return this.getClients
    }
  },
  methods: {
    ...mapActions(['addNewSession']),
    clear () {
      this.newSession = false
      this.item = {
        clientId: '',
        start: '',
        end: '',
        session_value: '',
        confirmation: false,
        attended: false,
        payed: false,
        details: '',
        frequency: 'none',
        color: ''
      }
    },
    openModal (item) {
      this.clear()
      this.dialogAgendaModal = true
      if (item) {
        this.item = item
      } else {
        this.newSession = true
      }
    },
    closeModal () {
      this.dialogAgendaModal = false
    },
    formatSessionData () {
      this.item = {
        ...this.item,
        session_value: parseFloat(this.item.session_value)
      }
    },
    async saveNewSession () {
      try {
        this.loading = true
        this.formatSessionData()

        const saveSessions = async (iterations, increment, unit) => {
          const date = dayjs(this.item.start)
          for (let i = 0; i < iterations; i++) {
            const newDate = date.add(i * increment, unit)
            const startDate = newDate.format('YYYY-MM-DDTHH:mm:ss')
            const endDate = newDate.format('YYYY-MM-DDTHH:mm:ss')
            const session = { ...this.item, start: startDate, end: endDate }
            await AgendaService.save(session)
          }
        }

        if (this.item.frequency === 'weekly') {
          await saveSessions(8, 1, 'week')
        } else if (this.item.frequency === 'biweekly') {
          await saveSessions(4, 2, 'week')
        } else if (this.item.frequency === 'monthly') {
          await saveSessions(2, 28, 'day')
        } else {
          await AgendaService.save(this.item)
        }

        this.$emit('snackbarSucess')
      } catch (error) {
        console.error('Erro ao salvar: ', error)
        this.$emit('snackbarFailure')
      } finally {
        this.addNewSession(this.item)
        this.closeModal()
        this.$emit('update')
        this.loading = false
      }
    }
  }
}
</script>
<template>
  <v-menu
    v-model="dialogAgendaModal"
    :close-on-content-click="false"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#0B132B"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Nova sessão
      </v-btn>
    </template>
    <v-card
      color="grey lighten-4"
      min-width="350px"
      flat
    >
      <v-toolbar
        color="#0B132B"
        dark
      >
        <v-toolbar-title>Nova sessão</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          color="white"
          @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <div class='pa-2'>
          <form @submit.prevent>
            <v-autocomplete
              v-model="item.clientId"
              :items="clients"
              label="Cliente"
              item-text="client_name"
              item-value="id"
              outlined
            />

            <v-text-field v-model="item.start" type="datetime-local" label="Data início"></v-text-field>
            <v-text-field v-model="item.end" type="datetime-local" label="Data fim"></v-text-field>

            <v-text-field
              v-model="item.session_value"
              label="Valor"
              placeholder="100"
              prefix="R$"
              outlined
              dense
            ></v-text-field>

            <v-autocomplete
              v-model="item.frequency"
              :items="frequencies"
              label="Frequência"
              item-text="text"
              item-value="value"
              outlined
            />

            <v-checkbox
              v-model="item.payed"
              color="#0B132B"
              class="my-0 py-0"
              label="Pagamento realizado"
            ></v-checkbox>
            <v-checkbox
              v-model="item.confirmation"
              color="#0B132B"
              class="my-0 py-0"
              label="Sessão confirmada"
            ></v-checkbox>
            <v-checkbox
              v-model="item.attended"
              color="#0B132B"
              class="my-0 py-0"
              label="Sessão realizada"
            ></v-checkbox>
            <p class="font-weight-medium text-body-2">Observações:</p>
            <textarea-autosize
              v-model="item.details"
              type="text"
              class="pa-2 textarea"
              :min-height="100"
              placeholder="Escreva aqui"
            />
            <v-text-field v-model="item.color" type="color" label="Cor"></v-text-field>
          </form>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          outlined
          color="green darken-2"
          class="ml-2 mb-2"
          :loading="loading"
          @click.prevent="saveNewSession"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  border: 1px solid #a9a8a8;
  border-radius: 5px
}

.textarea:focus {
  border: 1px solid #0f0f0f;
}
.textarea:hover {
  border: 1px solid #0f0f0f;
}
</style>
