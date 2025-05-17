<template>
  <v-app>
    <v-layout>
      <SuperAdminSidebar />
      <v-main>
        <SuperAdminTopbar />
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import SuperAdminSidebar from '@/components/superadmin/SuperAdminSidebar.vue'
import SuperAdminTopbar from '@/components/superadmin/SuperAdminTopbar.vue'
</script>
