<script>
import { mapGetters } from 'vuex'
import BaseModal from '@/components/BaseModal.vue'
import FinancesService from '../FinancesService'
import { EventBus } from '@/utils/EventBus'
import { uuid } from 'vue-uuid'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      item: {
        provider: '',
        id_client: '',
        due_date: '',
        payment_date: '',
        value: '',
        situation: ''
      },
      situations: [{
        text: 'Pendente',
        value: 'pending'
      },
      {
        text: 'Pago',
        value: 'paid'
      },
      {
        text: 'Atrasado',
        value: 'late'
      }],
      dialog: false,
      type: '',
      newBill: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getClients']),
    clients () {
      return this.getClients
    },

    displayName () {
      return (this.billsToPayModal && 'Conta a pagar') ||
      (this.billsToReceiveModal && 'Conta a receber') ||
      'Conta'
    }
  },
  created () {
    EventBus.$on('openFinanceModal', this.openModal)
  },
  beforeDestroy () {
    EventBus.$off('openFinanceModal')
  },
  methods: {
    clear () {
      this.item = {
        provider: '',
        id_client: '',
        due_date: '',
        payment_date: '',
        value: '',
        situation: ''
      }
    },
    openModal ({ item, type }) {
      this.type = type

      this.dialog = true
      this.clear()
      if (item?.id) {
        this.item = item
        this.newBill = false
      } else {
        this.newBill = true
      }
    },
    closeModal () {
      this.dialog = false
    },
    formatMoney (money) {
      if (Number.isInteger(money)) {
        return 'R$ ' + String(money) + ',00'
      } else {
        return 'R$ ' + String(money).replace('.', ',').padEnd(5, '0')
      }
    },
    async saveBill () {
      if (this.type === 'billToPay') {
        const bill = {
          id: uuid.v1(),
          provider: this.item.provider,
          due_date: this.item.due_date,
          payment_date: this.item.payment_date,
          value: parseFloat(this.item.value),
          situation: this.item.situation
        }

        try {
          this.loading = true
          await FinancesService.saveBillToPay(bill)
        } catch (error) {
          console.error('Erro ao salvar conta a pagar, ', error)
        } finally {
          this.loading = false
          this.dialog = false
          this.$emit('reloadBillsToPay')
        }
      } else {
        const bill = {
          id: uuid.v1(),
          id_client: this.item.id_client,
          due_date: this.item.due_date,
          payment_date: this.item.payment_date,
          value: parseFloat(this.item.value),
          situation: this.item.situation
        }

        try {
          this.loading = true
          await FinancesService.saveBillToReceive(bill)
        } catch (error) {
          console.error('Erro ao salvar conta a receber, ', error)
        } finally {
          this.loading = false
          this.dialog = false
          this.$emit('reloadBillsToReceive')
        }
      }
    },
    async updateBill (bill) {
      try {
        this.loading = true
        if (this.type === 'billToPay') {
          await FinancesService.updateBillToPay(this.item, bill.id)
        } else {
          await FinancesService.updateBillToReceive(this.item, bill.id)
        }
        this.$emit('snackbarSucess')
      } catch (e) {
        console.error(e)
        this.$emit('snackbarFailure')
      } finally {
        this.loading = false
        this.dialog = false
        if (this.type === 'billToPay') {
          this.$emit('reloadBillsToPay')
        } else {
          this.$emit('reloadBillsToReceive')
        }
      }
    }
  }
}
</script>
<template>
    <BaseModal :dialog='dialog'>
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
          <h3>{{  displayName }}</h3>
      </template>
      <template #modal-header>
          <v-container class="d-flex flex-column justify-content-start align-center">
            <v-row align="center">
              <v-col cols="12">
                <v-text-field
                  v-if='type === "billToPay"'
                  v-model="item.provider"
                  label="Fornecedor"
                  placeholder="Julia Machado"
                  outlined
                  dense
                ></v-text-field>
                <v-select
                  v-else
                  v-model="item.id_client"
                  label="Cliente"
                  :items="clients"
                  item-text="client_name"
                  item-value="id"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" class="d-flex">
                <v-text-field
                  v-model="item.due_date"
                  type="date"
                  :label="type === 'billToPay' ? 'Data de vencimento' : 'Data da conta'"
                  placeholder="07/05/2024"
                  class='mr-5'
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="item.payment_date"
                  type="date"
                  label="Data de pagamento"
                  placeholder="07/05/2024"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            <v-col cols='12'>
              <v-text-field
                v-model="item.value"
                label="Valor"
                placeholder="100"
                prefix="R$"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols='12'>
              <v-select
                v-model="item.situation"
                label="Situação"
                :items="situations"
                item-text="text"
                item-value="value"
                placeholder="Pendente"
                outlined
                dense
              ></v-select>
            </v-col>
            </v-row>
            <v-btn
              v-if="newBill"
              color="#0B132B"
              class="align-self-end white--text"
              :loading="loading"
              @click="saveBill"
            >
              Salvar
            </v-btn>
            <v-btn
              v-else
              color="#0B132B"
              class="align-self-end white--text"
              :loading="loading"
              @click="updateBill(item)"
            >
              Atualizar
            </v-btn>
          </v-container>
      </template>
    </BaseModal>
</template>

<style>

</style>
