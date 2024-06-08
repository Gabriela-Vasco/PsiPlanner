<script>
import { mapGetters } from 'vuex'
import AgendaService from '@/modules/agenda/AgendaService.js'

export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  },
  data () {
    return {
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
    async updateSession (session) {
      try {
        await AgendaService.update(session, session.id)
      } catch (e) {
        console.error(e)
      } finally {
        this.$emit('update')
      }
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
    <div class="w-60">
        <v-data-table
            class="data-table"
            :headers="headers"
            :items="items"
        >
        <!-- eslint-disable vue/valid-v-slot -->
            <template v-slot:item.clientId="{ item }">
                {{ clients[item.clientId] || '-' }}
            </template>
            <template v-slot:item.session_time="{ item }">
                {{ item.session_time || ' - ' }}
            </template>
            <template v-slot:item.session_value="{ item }">
                {{ formatMoney(item.session_value) || ' - ' }}
            </template>
            <template v-slot:item.confirmation="{ item }">
              <v-checkbox
                  v-model="item.confirmation"
                  color="#71F79F"
                  class="ml-6"
                  @click="updateSession(item)"
              ></v-checkbox>
            </template>
            <template v-slot:item.payed="{ item }">
              <v-checkbox
                  v-model="item.payed"
                  color="#71F79F"
                  class="ml-6"
                  @click="updateSession(item)"
              ></v-checkbox>
            </template>
            <template v-slot:item.attended="{ item }">
              <v-checkbox
                  v-model="item.attended"
                  color="#71F79F"
                  class="ml-6"
                  @click="updateSession(item)"
              ></v-checkbox>
            </template>
            <!-- <template v-slot:item.anotations>
                <div class="d-flex justify-content-center">
                    <v-btn
                        small
                        rounded
                        color="#83cfcb"
                    >
                        <v-icon>mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                </div>
            </template> -->
        </v-data-table>
    </div>
</template>

<style lang="sass" scoped>
@import 'src/style/components/data-table.sass'
</style>
