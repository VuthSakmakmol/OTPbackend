
// File: src/App.vue
<template>
  <v-app>
    <Navbar />
    <Sidebar v-if="isLoggedIn" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const isLoggedIn = !!localStorage.getItem('role')
</script>
