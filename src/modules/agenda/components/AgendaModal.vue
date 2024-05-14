<script>
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/EventBus.js'
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
        session_date: '',
        session_time: '',
        session_value: '',
        confirmation: false,
        attended: false,
        payed: false
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
  methods: {
    ...mapActions(['addNewSession']),
    clear () {
      this.newSession = false
      this.item = {
        clientId: '',
        session_date: '',
        session_time: '',
        session_value: '',
        confirmation: false,
        attended: false,
        payed: false
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
        session_value: parseFloat(this.item.session_value),
        session_date: dayjs(this.item.session_date)
      }
    },
    async saveNewSession () {
      try {
        this.formatSessionData()
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
                <v-text-field
                  v-model="item.client_name"
                  label="Nome do cliente"
                  placeholder="Joana Silva"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-0 py-0">
              </v-col>
              <v-col cols="10" class="my-0 py-0">
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
                <v-switch
                  v-model="item.payed"
                  color="#0B132B"
                  class="my-0 py-0"
                  :label="item.payed ? 'Pagamento realizado' : 'Pagamento não realizado'"
                ></v-switch>
                <v-switch
                  v-model="item.confirmation"
                  color="#0B132B"
                  class="my-0 py-0"
                  :label="item.confirmation ? 'Sessão confirmada' : 'Sessão não confirmada'"
                ></v-switch>
                <v-switch
                  v-model="item.attended"
                  color="#0B132B"
                  class="my-0 py-0"
                  :label="item.attended ? 'Sessão realizada' : 'Sessão não realizada'"
                ></v-switch>
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
