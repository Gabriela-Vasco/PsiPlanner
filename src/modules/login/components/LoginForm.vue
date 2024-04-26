<script>
export default {
  data () {
    return {
      showPassword: false,
      password: '',
      email: ''
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.password, this.email)
    }
  }
}
</script>
<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Login</h1>
    <p class="text-md text-color-1000 mt-7 mb-5">Informe seus dados e acesse sua conta:</p>
    <v-form class="bg-primary-light rounded-xl py-12 px-10" style="width: 400px;" @submit.prevent>
      <div>
        <p class="text-md mb-0">Email:</p>
        <small class="font-weight-medium text-color-1000">Informe o seu email</small>
        <v-text-field
          v-model='email'
          outlined
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-5'
          placeholder="email@email.com"
        />
      </div>
      <div class="mt-3">
        <p class="text-md mb-0">Senha:</p>
        <small class="font-weight-medium text-color-1000">Informe a sua senha</small>
        <v-text-field
          v-model='password'
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          outlined
          password
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-5'
          placeholder="********"
          @click:append="showPassword = !showPassword"
        />
      </div>
    </v-form>
    <v-btn plain class="align-self-end font-weight-light mt-4">
      <span>E</span>
      <span class="text-lowercase">squeci a senha</span>
    </v-btn>
    <v-btn color="#0B132B" class="white--text mb-5 mt-7" @click="handleSubmit">
      <span class="text-md">F</span>
      <span class="text-md text-lowercase">azer o login</span>
    </v-btn>
    <small class="text-color-1000">Não possui conta? <router-link to="/cadastro" class="font-weight-bold text-black">Criar conta</router-link></small>
  </div>
</template>
