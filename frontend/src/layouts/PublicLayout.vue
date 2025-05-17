<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar app color="indigo-darken-4" dark elevation="2">
      <v-container class="d-flex align-center">
        <v-icon size="28" class="mr-2">mdi-storefront</v-icon>
        <v-toolbar-title class="text-h6 font-weight-bold">My E-Commerce</v-toolbar-title>
        <v-spacer />
        <v-btn text to="/" class="text-white" exact>Home</v-btn>
        <v-btn text to="/login" class="text-white">Login</v-btn>
        <v-btn text to="/register" class="text-white">Register</v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container class="py-10">
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="indigo-darken-4" app inset>
      <v-container class="text-center text-white">
        &copy; {{ new Date().getFullYear() }} My E-Commerce. All rights reserved.
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
