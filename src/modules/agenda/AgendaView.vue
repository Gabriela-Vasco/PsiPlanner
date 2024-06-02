<script>
import { mapActions, mapGetters } from 'vuex'
import ClientsService from '@/modules/clients/ClientsService'
import { EventBus } from '@/utils/EventBus.js'
import AgendaService from './AgendaService'
import AgendaModal from './components/AgendaModal.vue'

export default {
  components: {
    AgendaModal
  },
  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    focus: new Date().toISOString().substring(0, 10),
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
    dialog: false,
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
  }),
  mounted () {
    this.fetchClients()
    this.fetchSessions()
    this.$refs.calendar.scrollToTime('07:00')
    this.$refs.calendar.checkChange()
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
        console.log(this.sessions)
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
      return event.color
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
        // setTimeout(() => (this.selectedOpen = true), 10)
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        // setTimeout(open, 10)
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    // updateRange ({ start, end }) {
    //   const events = []

    //   const min = new Date(`${start.date}T00:00:00`)
    //   const max = new Date(`${end.date}T23:59:59`)
    //   const days = (max.getTime() - min.getTime()) / 86400000
    //   const eventCount = this.rnd(days, days + 20)

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //     const second = new Date(first.getTime() + secondTimestamp)

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay
    //     })
    //   }

    //   this.events = events
    // },
    // rnd (a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a
    // },
    editSession (session) {
      this.currentlyEditing = session.id
    },
    async deleteSession (session) {
      try {
        await AgendaService.delete(session)
      } catch (e) {
        console.error(e)
      } finally {
        this.selectedOpen = false
        this.fetchSessions()
      }
    },
    async updateSession (session) {
      try {
        await AgendaService.update(session, this.currentlyEditing)
      } catch (e) {
        console.error(e)
      } finally {
        this.selectedOpen = false
        this.currentlyEditing = null
      }
    },
    openModal (item) {
      EventBus.$emit('openAgendaModal', item)
    },
    formatMoney (money) {
      return 'R$ ' + String(money) + ',00'
      // if (Number.isInteger(money)) {
      // } else {
      //   return 'R$ ' + String(money).replace('.', ',').padEnd(5, '0')
      // }
    }
  }
}
</script>

<template>
  <div class="calendar">
    <v-row class="fill-height">
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
            <v-btn
              color="primary"
              dark
              @click="openModal(null)"
            >
              Nova sessão
            </v-btn>
          </v-toolbar>
        </v-sheet>

        <agenda-modal @update="fetchSessions"/>

        <v-sheet height="600">
          <!-- <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="sessions"
            :event-color="getEventColor"
            :type="type"
            :now="today"
            class="mt-10"
            locale="pt-BR"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          >
          </v-calendar> -->
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="sessions"
            :event-color="getEventColor"
            :type="type"
            :now="today"
            class="mt-10"
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
                <v-btn icon @click="deleteSession(selectedEvent.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-toolbar-title>{{ clients[selectedEvent.clientId] }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <div v-if="currentlyEditing !== selectedEvent.id">
                  <p>
                    <span class="font-weight-medium text-body-2">Valor:</span>
                    {{ formatMoney(selectedEvent.session_value) }}
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
                    <v-text-field v-model="selectedEvent.start" type="date" label="Data início"></v-text-field>
                    <v-text-field v-model="selectedEvent.end" type="date" label="Data fim"></v-text-field>

                    <v-text-field
                      v-model="selectedEvent.session_value"
                      label="Valor"
                      placeholder="R$100,00"
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
                      style="width: 100%"
                      :min-height="100"
                      placeholder="add note"
                    />
                    <v-text-field v-model="selectedEvent.color" type="color" label="Cor"></v-text-field>
                  </form>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Fechar
                </v-btn>
                <v-btn
                  v-if="currentlyEditing !== selectedEvent.id"
                  text
                  @click.prevent="editSession(selectedEvent)"
                >
                  Editar
                </v-btn>
                <v-btn
                  v-else
                  text
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
  </div>
</template>

<style scoped lang="scss">
.calendar {
  margin: 20px 30px 5px 5px
}
</style>
