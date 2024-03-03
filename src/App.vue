<script>
import HeaderGlobal from "@/components/HeaderGlobal.vue"
import NavbarView from '@/components/NavbarView.vue'
export default {
  name: 'App',
  components: {
    NavbarView,
    HeaderGlobal
  },
};
</script>
<template>
  <v-app  id="app">
    <HeaderGlobal />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <NavbarView />
          </v-col>
          <v-col cols="10">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<style lang="sass">
@import './style/index.sass'
@import './style/style'
</style>
