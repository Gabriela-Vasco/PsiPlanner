<script>
import { mapActions, mapGetters } from 'vuex'
import ClientsService from '@/modules/clients/ClientsService'
import { EventBus } from '@/utils/EventBus.js'
import AgendaService from './AgendaService'
import AgendaModal from './components/AgendaModal.vue'
import dayjs from 'dayjs'

export default {
  components: {
    AgendaModal
  },
  data: () => ({
    snackbarSuccess: false,
    snackbarFailure: false,
    loading: false,
    today: dayjs().utc().utcOffset(-3).format('YYYY-MM-DD'),
    focus: dayjs().utc().utcOffset(-3).format('YYYY-MM-DD'),
    type: 'week',
    typeToLabel: {
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      '4day': '4 Dias'
    },
    start: null,
    end: null,
    name: null,
    client_name: null,
    details: null,
    session_date: null,
    color: '#18b2b0',
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    sessions: [],
    dialog: false
  }),

  mounted () {
    this.fetchClients()
    this.fetchSessions()
    this.$refs.calendar.scrollToTime('09:00')
    this.$refs.calendar.checkChange()
  },

  watch: {
    selectedOpen () {
      if (this.selectedOpen === false) {
        this.currentlyEditing = null
      }
    }
  },

  computed: {
    ...mapGetters(['getClients']),
    clients () {
      let clients = this.getClients
      clients = clients.reduce((acc, client) => {
        acc[client.id] = client.client_name
        return acc
      }, [])

      return clients
    }
  },

  methods: {
    ...mapActions(['setClients']),
    async fetchSessions () {
      try {
        this.sessions = await AgendaService.list()
        this.sessions = this.sessions.map(session => {
          return {
            ...session,
            name: this.clients[session.clientId]
          }
        })
      } catch (e) {
        console.error(e)
      }
    },

    async fetchClients () {
      try {
        const data = await ClientsService.list()
        this.setClients(data)
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
    },

    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },

    getEventColor (event) {
      return event.color || this.color
    },

    setToday () {
      this.focus = new Date().toISOString().substring(0, 10)
    },

    prev () {
      this.$refs.calendar.prev()
    },

    next () {
      this.$refs.calendar.next()
    },

    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },

    editSession (session) {
      this.currentlyEditing = session.id
    },
    async deleteSession (session) {
      try {
        this.loading = true
        await AgendaService.delete(session)
        this.snackbarSuccess = true
      } catch (e) {
        console.error(e)
        this.snackbarFailure = true
      } finally {
        this.selectedOpen = false
        this.loading = false
        this.fetchSessions()
      }
    },

    async updateSession (session) {
      try {
        this.loading = true
        await AgendaService.update(session, this.currentlyEditing)
        this.snackbarSuccess = true
      } catch (e) {
        console.error(e)
        this.snackbarFailure = true
      } finally {
        this.selectedOpen = false
        this.currentlyEditing = null
        this.loading = false
      }
    },
    openModal (item) {
      EventBus.$emit('openAgendaModal', item)
    }
  }
}
</script>

<template>
  <div class="calendar">
    <v-row class="fill-height" align="center">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Dia</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mês</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 dias</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              outlined
              class="mx-4"
              color="grey darken-2"
              @click="setToday"
            >
              Hoje
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" class="mx-4">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <agenda-modal
            @update="fetchSessions"
            @snackbarSucess="snackbarSuccess = true"
            @snackbarFailure="snackbarFailure = true"
            />
          </v-toolbar>
        </v-sheet>

        <v-sheet height="700" width="95%">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="sessions"
            :event-color="getEventColor"
            event-overlap-mode="column"
            event-overlap-threshold="30"
            :type="type"
            :now="today"
            class="mt-10 ml-10 fill-height"
            locale="pt-BR"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          >
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-toolbar-title>{{ clients[selectedEvent.clientId] }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  color="white"
                  @click="selectedOpen = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <div v-if="currentlyEditing !== selectedEvent.id">
                  <p>
                    <span class="font-weight-medium text-body-2">Valor:</span>
                    {{ ' R$ ' + selectedEvent?.session_value }}
                  </p>

                  <p>
                    <span class="font-weight-medium text-body-2">Sessão confirmada:</span>
                    {{ selectedEvent.confirmation ? 'Sim' : 'Não' }}
                  </p>

                  <p>
                    <span class="font-weight-medium text-body-2">Pagamento realizado:</span>
                    {{ selectedEvent.payed ? 'Sim' : 'Não' }}
                  </p>

                  <p>
                    <span class="font-weight-medium text-body-2">Sessão realizada:</span>
                    {{ selectedEvent.attended ? 'Sim' : 'Não' }}
                  </p>

                  <p class="font-weight-medium text-body-2">Observações:</p>
                  {{ selectedEvent.details }}
                </div>
                <div v-else>
                  <form @submit.prevent>
                    <v-text-field v-model="selectedEvent.start" type="datetime-local" label="Data início"></v-text-field>
                    <v-text-field v-model="selectedEvent.end" type="datetime-local" label="Data fim"></v-text-field>

                    <v-text-field
                      v-model="selectedEvent.session_value"
                      label="Valor"
                      placeholder="100"
                      prefix="R$"
                      outlined
                      dense
                    ></v-text-field>
                    <v-checkbox
                      v-model="selectedEvent.payed"
                      color="#0B132B"
                      class="my-0 py-0"
                      label="Pagamento realizado"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="selectedEvent.confirmation"
                      color="#0B132B"
                      class="my-0 py-0"
                      label="Sessão confirmada"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="selectedEvent.attended"
                      color="#0B132B"
                      class="my-0 py-0"
                      label="Sessão realizada"
                    ></v-checkbox>
                    <p class="font-weight-medium text-body-2">Observações:</p>
                    <textarea-autosize
                      v-model="selectedEvent.details"
                      type="text"
                      class="pa-2 textarea"
                      :min-height="100"
                      placeholder="Escreva aqui"
                    />
                    <v-text-field v-model="selectedEvent.color" type="color" label="Cor"></v-text-field>
                  </form>
                </div>
              </v-card-text>
              <v-card-actions>
                <div v-if="currentlyEditing !== selectedEvent.id" class="pa-0 ma-0">
                  <v-btn
                    outlined
                    text
                    color="red darken-2"
                    small
                    :loading="loading"
                    class="mr-2"
                    @click="deleteSession(selectedEvent.id)"
                  >
                    Excluir
                  </v-btn>
                  <v-btn
                    text
                    small
                    outlined
                    color="blue darken-2"
                    @click.prevent="editSession(selectedEvent)"
                  >
                    Editar
                  </v-btn>
                </div>

                <v-btn
                  v-else
                  text
                  small
                  outlined
                  color="green darken-2"
                  :loading="loading"
                  @click.prevent="updateSession(selectedEvent)"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbarSuccess"
      timeout="2000"
      elevation="12"
      absolute
      right
      color="success"
    >
      Requisição feita com sucesso!

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbarSuccess = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarFailure"
      timeout="2000"
      elevation="12"
      absolute
      right
      color="red darken-2"
    >
      Houve um erro na requisição, tente novamente

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbarFailure = false"
        >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</div>
</template>

<style scoped lang="scss">
.calendar {
  margin: 0px 20px 10px 5px;
}

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
