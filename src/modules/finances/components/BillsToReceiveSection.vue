<script>
import BillsToReceiveTable from '@/modules/finances/components/BillsToReceiveTable.vue'
export default {
  components: {
    BillsToReceiveTable
  },

  data () {
    return {
      headers: [
        {
          text: 'Cliente',
          value: 'client',
          align: 'center'
        },
        {
          text: 'Data da conta',
          value: 'due_date',
          align: 'center'
        },
        {
          text: 'Data de recebimento',
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
                <p>Contas recebidas</p>
                <p class='text-bold'>R$ 100,00</p>
            </div>

            <div style='border: 1px solid #F2542D' class="pa-5">
                <p>Contas atrasadas</p>
                <p class='text-bold'>R$ 100,00</p>
            </div>

            <div style='border: 1px solid #3DCCC7' class="pa-5">
                <p class="mb-0">Contas a receber</p>
                <p class='text-bold mt-3'>R$ 100,00</p>
            </div>
        </div>
        <BillsToReceiveTable
            :items='items'
            :headers='headers'
        />
    </div>
</template>
