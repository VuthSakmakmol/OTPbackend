<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item-title class="text-h6 pa-4">{{ role.toUpperCase() }} MENU</v-list-item-title>
      <v-divider />
      <v-list-item link v-if="role === 'superadmin'" to="/superadmin/dashboard">Superadmin Dashboard</v-list-item>
      <v-list-item link v-if="role === 'admin'" to="/admin/dashboard">Admin Dashboard</v-list-item>
      <v-list-item link v-if="role === 'delivery'" to="/delivery/dashboard">Delivery Dashboard</v-list-item>
      <v-list-item link v-if="role === 'customer'" to="/customer/dashboard">Customer Dashboard</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      role: localStorage.getItem("role") || "guest"
    }
  }
}
</script>
