<script>
// eslint-disable vue/valid-v-slot
export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  }
}
</script>
<template>
    <div class="w-60">
        <v-data-table
            class="data-table"
            :headers="headers"
            :items="items"
        >
            <template v-slot:item.id_client="{ item }">
                {{ item.id_client || ' - ' }}
            </template>
            <template v-slot:item.start_date="{ item }">
                {{ item.start_date || ' - ' }}
            </template>
            <template v-slot:item.appointment_time="{ item }">
                {{ item.appointment_time || ' - ' }}
            </template>
            <template v-slot:item.payment_value="{ item }">
                {{ item.payment_value || ' - ' }}
            </template>
            <template v-slot:item.active="{ item }">
                <v-chip
                    :color="item.active ? '#71F79F' : '#F2542D'"
                >
                    {{ item.active? 'Ativo' : 'Inativo' }}
                </v-chip>
            </template>
            <template v-slot:item.psychological_records>
                <div class="d-flex justify-content-center">
                    <v-btn
                        small
                        rounded
                        color="#83cfcb"
                    >
                        <v-icon>mdi-file-cabinet</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
