<script>
export default {
  data () {
    return {
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      month: ''
    }
  }
}
</script>

<template>
    <div>
        <v-divider class='mb-10'/>
        <div class="d-flex justify-space-around align-items-center">
            <div>
                <span class="mb-3">Selecione o mês:</span>
                <v-select
                    v-model="month"
                    :items="months"
                    placeholder="Janeiro"
                    outlined
                />
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex flex-column">
                    <span class="mb-3">
                        Receita:
                        <v-icon color='#71F79F'>mdi-arrow-up-bold-circle-outline</v-icon>
                    </span>
                    <div class="d-flex">
                        <div style='border: 1px solid #71F79F' class="pa-2">
                            Recebido: R$100,00
                        </div>
                        <div style='border: 1px solid #71F79F' class="pa-2">
                            A receber: R$50,00
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column mt-5">
                    <span class="mb-3">
                        Despesas:
                        <v-icon color="#F2542D">mdi-arrow-down-bold-circle-outline</v-icon>
                    </span>
                    <div class="d-flex">
                        <div style='border: 1px solid #F2542D' class="pa-2">
                            Pago: R$100,00
                        </div>
                        <div style='border: 1px solid #F2542D' class="pa-2">
                            A pagar: R$50,00
                        </div>
                    </div>
                </div>
            </div>
            <div style='border: 1px solid #3DCCC7' class="pa-5">
                <p>Resultado: {{ month || ' - '}}</p>
                <p>(Receitas - Despesas)</p>
                <p class='text-success'>R$ 100,00</p>
            </div>
        </div>

        <div style='border: 1px solid #3DCCC7' class="pa-5 my-10 mx-5">
            Grafico
        </div>
    </div>
</template>
