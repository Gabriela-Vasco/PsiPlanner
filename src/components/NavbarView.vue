<script>
export default {
  name: 'NavbarView',
  data(){
    return {
      items: [
          { title: 'Dashboard', icon: 'mdi-home', path: '/' },
          { title: 'Agenda', icon: 'mdi-calendar', path:"/agenda" },
          { title: 'Prontuários', icon: 'mdi-account', path:"/prontuarios" },
          { title: 'Financeiro', icon: 'mdi-currency-usd', path:"/financeiro" },
        ],
    }
  }

}
</script>

<template>
    <v-navigation-drawer permanent absolute>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="item.path" class="">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
