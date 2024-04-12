<script>
/* eslint-disable */
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
    <div class="table-bills-to-pay">
        <v-data-table
            :headers="headers"
            :items="items"
        >
            <template v-slot:item.id_client="{ item }">
                {{ item.id_client || ' - ' }}
            </template>
            <template v-slot:item.appointment_time="{ item }">
                {{ item.appointment_time || ' - ' }}
            </template>
            <template v-slot:item.confirmation="{ item }">
                <div class="d-flex justify-content-center align-items-center">
                    <v-checkbox
                        v-model="item.confirmation"
                    ></v-checkbox>
                    <v-btn
                        v-if="!item.confirmation"
                        icon
                        color="blue"
                    >
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                </div>
            </template>
            <template v-slot:item.payment="{ item }">
                <div class="d-flex justify-content-center">
                    <v-checkbox
                        v-model="item.payment"
                    ></v-checkbox>
                </div>
            </template>
            <template v-slot:item.anotations>
                <div class="d-flex justify-content-center">
                    <v-btn
                        small
                        rounded
                        color="blue"
                    >
                        <v-icon color="white">mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<style lang="sass">
.table-bills-to-pay
  .v-data-table__wrapper
    table
      thead
        th
          border-bottom: 0 !important
      tbody
        tr:nth-child(even)
          background-color: #f4f4f4
        td
          border-right: 1px solid rgba(0, 0, 0, 0.12)
          font-weight: 500
          color: #5E5E5E
          font-size: 12px

        td:last-child
          border-right: 0
</style>
