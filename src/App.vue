<script>
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    GlobalHeader,
    GlobalFooter
  }
}
</script>
<template>
  <v-app  id="app">
    <GlobalHeader />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <Navbar />
          </v-col>
          <v-col cols="10">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <GlobalFooter />
  </v-app>
</template>

<style lang="sass">
@import './style/index.sass'
@import './style/style'
</style>
