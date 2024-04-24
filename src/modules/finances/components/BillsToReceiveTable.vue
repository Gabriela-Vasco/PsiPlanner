<script>
export default {
  props: {
    headers: {
      type: Array, default: () => []
    },
    items: {
      type: Array, default: () => []
    }
  },
  data () {
    return {

    }
  }
}
</script>
<template>
    <div class='mx-10'>
        <v-data-table
            class="data-table"
            :headers="headers"
            :items="items"
        >
        </v-data-table>
    </div>
</template>
