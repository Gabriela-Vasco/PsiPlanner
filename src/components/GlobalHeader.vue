<script>
/* eslint-disable */
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
    <div class="d-flex align-items-center">
        <img src="../assets/logo.svg" alt="logo">
        <h1 class="ml-3">PsiPlanner</h1>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <h2 class="mr-2">Olá, {{ userName }}</h2>
      <v-avatar color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </div>
  </header>
</template>