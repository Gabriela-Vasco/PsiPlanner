<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openDialog: false
    }
  },
  watch: {
    dialog (val) {
      this.openDialog = val
    }
  }
}
</script>
<template>
    <v-dialog
      v-model='openDialog'
      persistent
      width="500px"
    >
        <v-card>
            <slot name="close" />
            <v-card>
                <v-card-title>
                <slot name="modal-title" />
                </v-card-title>

                <div>
                    <slot name="modal-header"/>
                </div>

                <v-card-text>
                    <slot name="modal-content" />
                </v-card-text>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<style>

</style>
