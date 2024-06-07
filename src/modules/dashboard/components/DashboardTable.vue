<script>
import { mapGetters, mapActions } from 'vuex'
import AgendaService from '@/modules/agenda/AgendaService.js'
// eslint-disable vue/valid-v-slot
export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  },
  watch: {
    items () {
      console.log(this.items)
    }
  },
  data () {
    return {
      allowEdit: false
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
    updateSession () {
      this.allowEdit = false
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
            <template v-slot:item.clientId="{ item }">
                {{ clients[item.clientId] || '-' }}
            </template>
            // eslint-disable-next-line vue/valid-v-slot
            <template v-slot:item.session_date="{ item }">
                {{ item.session_date || ' - ' }}
            </template>
            <template v-slot:item.session_value="{ item }">
                {{ formatMoney(item.session_value) || ' - ' }}
            </template>
            <template v-slot:item.attended="{ item }">
                <div class="d-flex justify-content-center align-items-center">
                    <v-checkbox
                        v-model="item.attended"
                        :disabled="!allowEdit"
                    ></v-checkbox>
                    <!-- <v-btn
                        v-if="!item.confirmation"
                        icon
                        color="blue"
                    >
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn> -->
                </div>
            </template>
            <template v-slot:item.payed="{ item }">
                <div class="d-flex justify-content-center">
                    <v-checkbox
                        v-model="item.payed"
                        :disabled="!allowEdit"
                    ></v-checkbox>
                </div>
            </template>
            <template v-slot:item.actions>
                <div v-if="!allowEdit" class="d-flex justify-content-center">
                    <v-btn
                      small
                      rounded
                      color="#0B132B"
                      icon
                      @click="allowEdit = true"
                    >
                        <v-icon>mdi-pencil-circle</v-icon>
                    </v-btn>
                </div>
                <div v-else class="d-flex justify-content-center">
                    <v-btn
                      small
                      rounded
                      color="success"
                      icon
                      @click="updateSession"
                    >
                        <v-icon>mdi-check-circle</v-icon>
                    </v-btn>
                    <v-btn
                      small
                      rounded
                      color="error"
                      icon
                      @click="allowEdit = false"
                    >
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </div>
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
