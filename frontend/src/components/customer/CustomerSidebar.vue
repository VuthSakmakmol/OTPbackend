<template>
  <v-navigation-drawer permanent>
    <v-list nav dense>
      <v-list-item-title class="text-h6 text-center mt-2">🧑 Customer</v-list-item-title>

      <v-list-item to="/customer/dashboard" prepend-icon="mdi-home">
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item to="/customer/track" prepend-icon="mdi-map-marker">
        <v-list-item-title>Track Location</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
