<template>
  <v-app>
    <!-- Keep drawer out of v-main to prevent recursion -->
    <v-navigation-drawer v-model="drawer" app permanent>
      <SuperAdminSidebar />
    </v-navigation-drawer>

    <v-main>
      <SuperAdminTopbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import SuperAdminSidebar from '@/components/superadmin/SuperAdminSidebar.vue'
import SuperAdminTopbar from '@/components/superadmin/SuperAdminTopbar.vue'

const drawer = ref(true) // DO NOT bind this in sidebar again
</script>
