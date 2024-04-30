<script>
import { icon } from '@/assets/folder.svg'
export default {
  props: {
    label: {
      type: String
    }
  },
  data () {
    return {
      icon
    }
  },
  methods: {
    downloadFile () {
      console.log('Download file', this.label)
    }
  }
}
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-items-center">
        <button @click='downloadFile'>
            <v-img
                src="@/assets/folder.svg"
                width="300px"
                height="220px"
            />
        </button>
        <p>{{ label }}</p>
    </div>
</template>
