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
    <h1>Cadastro</h1>
    <p class="text-md text-color-1000 mt-7 mb-5">Informe seus dados e faça o cadastro da sua conta:</p>
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
      <span class="text-md text-lowercase">azer o cadastro</span>
    </v-btn>
    <small class="text-color-1000">Já possui conta? <a href="/login" class="font-weight-bold text-black">Fazer o login</a></small>
  </div>
</template>
