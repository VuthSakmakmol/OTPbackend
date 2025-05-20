<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item-title class="text-h6 text-center py-4">🚚 Delivery</v-list-item-title>

      <v-divider />

      <v-list-item link to="/delivery/dashboard">
        <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="requestLocationAccess">
        <v-list-item-icon><v-icon>mdi-map-marker</v-icon></v-list-item-icon>
        <v-list-item-title>Allow Live Location</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const requestLocationAccess = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        alert(`✅ Location: ${pos.coords.latitude}, ${pos.coords.longitude}`)
      },
      err => {
        alert('❌ Location access denied')
      }
    )
  } else {
    alert('❌ Geolocation not supported')
  }
}
</script>
