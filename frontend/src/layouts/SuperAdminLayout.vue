<template>
  <v-app>
    <v-layout>
      <!-- Drawer stays outside of v-main -->
      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
      >
      </v-navigation-drawer>

      <v-main>
        <!-- Sidebar content -->
        <SuperAdminSidebar />
        <SuperAdminTopbar />
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import SuperAdminSidebar from '@/components/superadmin/SuperAdminSidebar.vue'
import SuperAdminTopbar from '@/components/superadmin/SuperAdminTopbar.vue'

const drawer = ref(true) // This controls the sidebar
</script>
