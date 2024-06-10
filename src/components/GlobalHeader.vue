<script>
export default {
  name: 'HeaderGlobal',
  data () {
    return {
      userName: 'Fulana'
    }
  }
}
</script>

<template>
  <header class="d-flex justify-content-between align-items-center py-10 px-5 bg-primary">
    <div class="d-flex align-items-center">
        <img src="../assets/logo.svg" alt="logo">
        <h1 class="ml-3">PsiPlanner</h1>
    </div>
  </header>
</template>
