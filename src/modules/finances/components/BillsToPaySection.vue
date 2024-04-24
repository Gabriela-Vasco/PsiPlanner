<script>
import BillsToPayTable from '@/modules/finances/components/BillsToPayTable.vue'
export default {
  components: {
    BillsToPayTable
  },

  data () {
    return {
      headers: [
        {
          text: 'Fornecedor',
          value: 'provider',
          align: 'center'
        },
        {
          text: 'Data de vencimento',
          value: 'due_date',
          align: 'center'
        },
        {
          text: 'Data de pagamento',
          value: 'payment_date',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'value',
          align: 'center'
        },
        {
          text: 'Situação',
          value: 'active',
          align: 'center'
        }
      ],
      items: []
    }
  }
}
</script>

<template>
    <div>
        <v-divider class='mb-10'/>
        <div class="d-flex justify-space-around align-items-center mb-10">
            <div style='border: 1px solid #71F79F' class="pa-5">
                <p>Contas pagas</p>
                <p class='text-bold'>R$ 100,00</p>
            </div>

            <div style='border: 1px solid #F2542D' class="pa-5">
                <p>Contas vencidas</p>
                <p class='text-bold'>R$ 100,00</p>
            </div>

            <div style='border: 1px solid #3DCCC7' class="pa-5">
                <p class="mb-0">Contas a pagar</p>
                <small class="text-color-900">(Vencidas e a vencer)</small>
                <p class='text-bold mt-3'>R$ 100,00</p>
            </div>
        </div>
        <BillsToPayTable
            :items='items'
            :headers='headers'
        />
    </div>
</template>
