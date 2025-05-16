<template>
  <v-container>
    <h1>👑 Superadmin Dashboard</h1>
    <p>Welcome, you have full system control.</p>
  </v-container>
</template>

<script setup>
if (localStorage.getItem('role') !== 'superadmin') {
  alert('Access denied')
  window.location.href = '/'
}
</script>
