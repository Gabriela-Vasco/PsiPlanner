<script>
import BillsToPaySection from '@/modules/finances/components/BillsToPaySection.vue'
import BillsToReceiveSection from '@/modules/finances/components/BillsToReceiveSection.vue'
import FinanceModal from '@/modules/finances/components/FinanceModal.vue'
import FinancesService from './FinancesService'

export default {
  components: {
    BillsToPaySection,
    BillsToReceiveSection,
    FinanceModal
  },
  data () {
    return {
      tab: null,
      billsToPay: [],
      billsToReceive: [],
      snackbarSuccess: false,
      snackbarFailure: false
    }
  },
  mounted () {
    this.fetchBillsToPay()
    this.fetchBillsToReceive()
  },
  methods: {
    async fetchBillsToPay () {
      try {
        const data = await FinancesService.listBillsToPay()
        this.billsToPay = data
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
    },
    async fetchBillsToReceive () {
      try {
        const data = await FinancesService.listBillsToReceive()
        this.billsToReceive = data
      } catch (error) {
        console.error('Erro ao buscar dados, ', error)
      }
    },
    setSnackBarSuccess () {
      this.snackbarSuccess = true
      this.snackbarFailure = false
    },
    setSnackbarFailure () {
      this.snackbarFailure = true
      this.snackbarSuccess = false
    }
  }
}
</script>

<template>
  <div class="fill-height ma-5">
    <v-card class="my-5 pa-5">
        <v-tabs
          v-model="tab"
          class='my-3'
        >
          <v-tabs-slider color="#E6F5F4"></v-tabs-slider>

          <v-tab href="#tab-2">Contas a pagar</v-tab>
          <v-tab href="#tab-3">Contas a receber</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value='tab-2'>
                <BillsToPaySection
                  :billsToPay="billsToPay"
                  @reloadBillsToPay="fetchBillsToPay"
                  @snackbarSucess="setSnackBarSuccess"
                  @snackbarFailure="setSnackbarFailure"
                />
            </v-tab-item>

            <v-tab-item value='tab-3'>
                <BillsToReceiveSection
                  :billsToReceive="billsToReceive"
                  @reloadBillsToReceive="fetchBillsToReceive"
                  @snackbarSucess="setSnackBarSuccess"
                  @snackbarFailure="setSnackbarFailure"
                />
            </v-tab-item>
        </v-tabs-items>
        <FinanceModal
          @reloadBillsToPay="fetchBillsToPay"
          @reloadBillsToReceive="fetchBillsToReceive"
          @snackbarSucess="setSnackBarSuccess"
          @snackbarFailure="setSnackbarFailure"
        />
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
    </v-card>
  </div>
</template>
