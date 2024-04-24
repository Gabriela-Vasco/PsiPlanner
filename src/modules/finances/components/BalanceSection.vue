<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  components: {
    Bar
  },
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
      month: '',
      data: {
        labels: [
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
        datasets: [
          {
            label: 'Entradas',
            backgroundColor: '#71F79F',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Despesas',
            backgroundColor: '#F2542D',
            data: [39, 80, 40, 20, 12, 12, 11, 12, 39, 10, 40, 39]
          }
        ]
      },
      options: {
        responsive: true
      }
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
            <Bar :data="data" :options="options" width="500px"
    height="180px"/>
        </div>
    </div>
</template>
