<script>
// import BalanceSection from '@/modules/finances/components/BalanceSection.vue'
import BillsToPaySection from '@/modules/finances/components/BillsToPaySection.vue'
import BillsToReceiveSection from '@/modules/finances/components/BillsToReceiveSection.vue'
import FinanceModal from '@/modules/finances/components/FinanceModal.vue'
export default {
  components: {
    // BalanceSection,
    BillsToPaySection,
    BillsToReceiveSection,
    FinanceModal
  },
  data () {
    return {
      tab: null
    }
  }
}
</script>

<template>
    <v-card class="my-10 h-100vh">
        <v-tabs
          v-model="tab"
          class='my-3'
        >
          <v-tabs-slider color="#E6F5F4"></v-tabs-slider>

          <!-- <v-tab href="#tab-1">Balanço</v-tab> -->
          <v-tab href="#tab-2">Contas a pagar</v-tab>
          <v-tab href="#tab-3">Contas a receber</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- <v-tab-item value='tab-1'>
                <BalanceSection />
            </v-tab-item> -->

            <v-tab-item value='tab-2'>
                <BillsToPaySection />
            </v-tab-item>

            <v-tab-item value='tab-3'>
                <BillsToReceiveSection />
            </v-tab-item>
        </v-tabs-items>
        <FinanceModal />
    </v-card>
</template>
