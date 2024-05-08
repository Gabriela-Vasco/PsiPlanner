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
      width="40%"
    >
        <v-card class="d-flex flex-column align-center pa-5">
            <slot name="close" />
            <v-card
              outlined
              flat
              width="100%"
              class='d-flex flex-column align-around justify-content-center py-5 mt-5 base-modal'
            >
              <v-card-title class="align-self-center">
                <slot name="modal-title" />
              </v-card-title>
              <slot name="modal-header"/>

                <!-- <v-card-text>
                    <slot name="modal-content" />
                </v-card-text> -->
            </v-card>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
@import 'src/style/components/base-modal.sass'
</style>
