<template>
  <v-app>
    <CustomerTopbar />
    <v-main>
      <v-container fluid class="d-flex">
        <CustomerSidebar />
        <router-view class="flex-grow-1 ml-4" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import CustomerTopbar from '@/components/customer/CustomerTopbar.vue'
import CustomerSidebar from '@/components/customer/CustomerSidebar.vue'
</script>
