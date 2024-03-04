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
  <header class="d-flex justify-content-between align-items-center py-10 px-10 border-primary bg-primary">
    <h1>PsiPlanner</h1>
    <div class="d-flex justify-content-center align-items-center">
      <h2 class="mr-2">Olá, {{ userName }}</h2>
      <v-avatar color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </div>
  </header>
</template>