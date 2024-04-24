<script>
/* eslint-disable */
export default {
  name: 'NavbarView',
  data(){
    return {
      items: [
          { title: 'Dashboard', icon: 'mdi-home', path: '/' },
          { title: 'Agenda', icon: 'mdi-calendar', path:"/agenda" },
          { title: 'Clientes', icon: 'mdi-account', path:"/clientes" },
          { title: 'Financeiro', icon: 'mdi-currency-usd', path:"/financeiro" },
          { title: 'Arquivos', icon: 'mdi-folder-text', path:"/arquivos" },
        ],
    }
  }

}
</script>

<template>
    <v-navigation-drawer permanent absolute class="bg-primary-dark">
      <v-list
        dense
        nav
        class="bg-primary-dark"
      >
      <v-list-item
      v-for="item in items"
      :key="item.title"
      class="my-4 py-1 hover-item"
      >
      <v-list-item-content >
          <router-link :to="item.path" class="d-flex">
            <v-list-item-icon>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="text-white py-2 font-regular" style="font-size: 20px">{{ item.title }}</v-list-item-title>
            </router-link>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.hover-item:hover {
  background-color: #2c3e50; /* Change to your desired hover background color */
}
</style>
