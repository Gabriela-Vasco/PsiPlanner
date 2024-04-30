<script>
import SignUpForm from '@/modules/signup/components/SignUpForm.vue'

export default {
  components: {
    SignUpForm
  }
}
</script>
<template>
    <div class="d-flex w-100 h-screen">
        <div class="d-flex flex-column align-items-start w-50">
          <div class="d-flex align-items-center mt-5 ml-5">
              <img src="../../assets/logo.svg" alt="logo">
              <h1 class="ml-3">PsiPlanner</h1>
          </div>

          <SignUpForm class='mt-16 align-self-center'/>
        </div>
        <v-img src="@/assets/signUp-cover.png" min-height="100vh" class="w-50"/>
    </div>
</template>
