<script>
import { mapActions, mapGetters } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
import AgendaService from '@/modules/agenda/AgendaService'
import BaseModal from '@/components/BaseModal.vue'
import dayjs from 'dayjs'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      dialogAgendaModal: false,
      newSession: false,
      item: {
        clientId: '',
        start: '',
        end: '',
        session_value: '',
        confirmation: false,
        attended: false,
        payed: false,
        details: ''
      }
    }
  },
  created () {
    EventBus.$on('openAgendaModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openAgendaModal', this.openModal)
  },
  watch: {
    dateWithoutFormatting (val) {
      this.item.start_date = dayjs(val).format('DD/MM/YYYY')
    }
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
        details: ''
        // color: ''
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
        this.formatSessionData()
        await AgendaService.save(this.item)
      } catch (error) {
        console.error('Erro ao salvar: ', error)
      } finally {
        this.addNewSession(this.item)
        this.closeModal()
        this.$emit('update')
      }
    }
  }
}
</script>
<template>
    <BaseModal :dialog='dialogAgendaModal'>
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
          <h3 v-if="newSession">Nova sessão</h3>
          <h3 v-else>Sessão do dia {{ item.session_date }}</h3>
      </template>
      <template #modal-header>
          <v-container class="d-flex flex-column mt-7">
            <v-row class="d-flex flex-column align-center">
              <v-col v-if="newSession" cols="10" class="my-0 py-0">
                <v-autocomplete
                  v-model="item.clientId"
                  :items="clients"
                  item-text="client_name"
                  item-value="id"
                />
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field v-model="item.start" type="date" label="Data início"></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field v-model="item.end" type="date" label="Data fim"></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <v-text-field
                  v-model="item.session_value"
                  label="Valor"
                  placeholder="R$100,00"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
                <textarea-autosize
                  v-model="item.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="details"
                />
              </v-col>
              <v-col cols="10" class="my-0 py-0">
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
                <v-text-field v-model="item.color" type="color" label="Cor"></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              color="#0B132B"
              class="align-self-end white--text"
              @click="saveNewSession"
            >
              Salvar
            </v-btn>
          </v-container>
      </template>
    </BaseModal>
</template>

<style>

</style>
