<script>
export default {
    name: 'HeaderGlobal',
    data(){
        return{
            userName: 'Fulana', 
        }
    }
}
</script>

<template>
<v-app-bar elevation="1" app class="d-flex justify-content-between align-center">
    <div style="margin-right: 80vw">
      <v-toolbar-title >PsiPlanner</v-toolbar-title>
    </div>
    <div class="d-flex align-center justify-content-between">
      <h2 class="mr-2">Olá, {{ userName }}</h2>
      <v-avatar color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </div>
  </v-app-bar>
</template>
