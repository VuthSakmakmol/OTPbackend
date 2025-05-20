<template>
  <v-app>
    <v-layout>
      <DeliverySidebar />

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import DeliverySidebar from '@/components/delivery/DeliverySidebar.vue'
</script>
