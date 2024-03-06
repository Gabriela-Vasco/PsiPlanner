<script>
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import DashboardTable  from '@/components/DashboardTable.vue'
  export default {
    name: 'DashboardView',
    components: {
      DashboardTable
    },
    data(){
      return {
        today: '',
        headers: [
          {
            text: 'Cliente',
            value: 'id_client'
          },
          {
            text: 'Horário',
            value: 'appointment_time'
          },
          {
            text: 'Confirmação',
            value: 'confirmation'
          },
          {
            text: 'Pagamento',
            value: 'payment'
          },
          {
            text: 'Anotações',
            value: 'anotations'
          }
        ],
        items: [{
          id_client: 1,
          appointment_time: '9:00',
          confirmation: false,
          payment: false
        },
        {
          id_client: 2,
          appointment_time: '9:00',
          confirmation: false,
          payment: false
        }]
      }
    },
    mounted() {
      this.today = format(new Date(), "dd 'de' MMMM yyyy", { locale: ptBR });
    }
  }
</script>
<template>
  <v-card class="d-flex flex-column align-items-center my-10">
    <h1 class="my-10">{{today}}</h1>
    <DashboardTable :headers="headers" :items="items"/>
  </v-card>
</template>

