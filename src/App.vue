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
  },
  data () {
    return {
      showLayoutDefault: true
    }
  },
  mounted () {
    if (this.$route.name !== 'login' || this.$route.name !== 'cadastro') {
      this.showLayoutDefault = false
    } else {
      this.showLayoutDefault = true
    }
  }
}
</script>
<template>
  <v-app  id="app" class="ma-0 pa-0 h-screen">
    <GlobalHeader
      v-if="showLayoutDefault"
      />
    <v-main class="ma-0 pa-0 w-100">
      <v-container fluid class="ma-0 pa-0 w-100">
        <v-row>
          <v-col cols="2" v-if="showLayoutDefault">
            <Navbar />
          </v-col>
          <v-col :cols="showLayoutDefault ? '10' : '12'">
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
