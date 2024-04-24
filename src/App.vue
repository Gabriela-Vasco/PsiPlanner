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
  mounted () {
    console.log(this.$route)
  }
}
</script>
<template>
  <v-app  id="app" class="ma-0 pa-0">
    <GlobalHeader
      v-if="this.$route.name != 'login'"
      />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <Navbar v-if="this.$route.name != 'login'" />
          </v-col>
          <v-col cols="10">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <GlobalFooter v-if="this.$route.name != 'login'" />
  </v-app>
</template>

<style lang="sass">
@import './style/index.sass'
@import './style/style'
</style>
