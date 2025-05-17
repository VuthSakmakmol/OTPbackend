<template>
  <v-app-bar flat color="primary" dark>
    <v-app-bar-title>SuperAdmin Dashboard</v-app-bar-title>
    <v-spacer />
    <v-btn icon @click="logout" title="Logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  router.push('/login')
}
</script>
