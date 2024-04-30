<script>
export default {
  data () {
    return {
      showPassword: false,
      name: '',
      email: '',
      passwordConfirmation: '',
      password: '',
      rules: {
        required: value => !!value || 'Campo obrigatório',
        counter: value => value.length === 8 || 'A senha deve ter 8 caracteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
        password: value => value !== this.password || 'As senhas não coincidem'
      }
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
    <v-form class="bg-primary-light rounded-xl py-12 px-10" style="width: 500px;" @submit.prevent>
      <div>
        <p class="text-md mb-0">Nome:</p>
        <small class="font-weight-medium text-color-1000">Informe o seu nome completo</small>
        <v-text-field
          v-model='name'
          outlined
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-2'
          placeholder="Ana Silva"
          :rules="[rules.required]"
        />
      </div>
      <div class="mt-1">
        <p class="text-md mb-0">Email:</p>
        <small class="font-weight-medium text-color-1000">Informe o seu email</small>
        <v-text-field
          v-model='email'
          outlined
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-2'
          placeholder="email@email.com"
          :rules="[rules.required, rules.email]"
        />
      </div>
      <div class="mt-1">
        <p class="text-md mb-0">Senha:</p>
        <small class="font-weight-medium text-color-1000">Informe uma senha com 8 caracteres</small>
        <v-text-field
          v-model='password'
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          outlined
          password
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-2'
          placeholder="********"
          @click:append="showPassword = !showPassword"
          minLength="8"
          maxlength="8"
          :rules="[rules.required, rules.counter]"
        />
      </div>
      <div class="mt-1">
        <p class="text-md mb-0">Confirme a sua senha:</p>
        <small class="font-weight-medium text-color-1000">Informe uma senha com 8 caracteres</small>
        <v-text-field
          v-model='passwordConfirmation'
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          outlined
          password
          color="#3DCCC7"
          background-color="#DDDDDD"
          class='mt-2'
          placeholder="********"
          @click:append="showPassword = !showPassword"
          error
          :rules="[rules.required, rules.password]"
        />
      </div>
    </v-form>
    <v-btn color="#0B132B" class="white--text mb-5 mt-7" @click="handleSubmit">
      <span class="text-md">F</span>
      <span class="text-md text-lowercase">azer o cadastro</span>
    </v-btn>
    <small class="text-color-1000">Já possui conta? <router-link to="/login" class="font-weight-bold text-black">Fazer o login</router-link></small>
  </div>
</template>
