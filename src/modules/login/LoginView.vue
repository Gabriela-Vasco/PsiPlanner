<script>
import { loginCover } from '@/assets/login-cover.png'
import LoginForm from '@/modules/login/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loginCover
    }
  }
}
</script>
<template>
    <div class="d-flex w-100 h-screen">
        <v-img src="@/assets/login-cover.png" min-height="100vh" class="w-50"/>
        <div class="d-flex flex-column align-items-end w-50">
          <div class="d-flex align-items-center mt-5 mr-5">
              <img src="../../assets/logo.svg" alt="logo">
              <h1 class="ml-3">PsiPlanner</h1>
          </div>

          <LoginForm class='mt-16 align-self-center'/>
        </div>
    </div>
</template>
