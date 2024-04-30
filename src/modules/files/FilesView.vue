<script>
import FileFolder from '@/modules/files/components/FileFolder.vue'
export default {
  name: 'FilesView',
  components: {
    FileFolder
  },
  data () {
    return {
      files: [
        {
          label: 'Recibo'
        },
        {
          label: 'Declaração de comparecimento'
        },
        {
          label: 'Atestado psicológico'
        }
      ]
    }
  }
}
</script>

<template>
    <v-card class="d-flex flex-column align-items-center my-10 h-100vh">
      <p class="my-10 font-semibold text-lg">Clique na pasta correspondente para baixar o template do documento desejado</p>
      <div class="d-flex justify-content-center align-items-center">
        <FileFolder v-for="(file, i) in files" :key="i" :label="file.label"/>
      </div>
    </v-card>
</template>
