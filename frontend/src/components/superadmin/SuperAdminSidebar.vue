<!-- SuperAdminSidebar.vue -->
<template>
  <v-list dense>
    <v-list-item-title class="text-h6 text-center mt-3">SuperAdmin</v-list-item-title>
    <v-divider class="my-3" />

    <v-list-item to="/superadmin/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
    <v-list-item to="/superadmin/manage-staff" prepend-icon="mdi-account-group" title="Manage Staff" />
    <v-list-item :to="{ name: 'SuperAdminManageCustomer' }" prepend-icon="mdi-account-group" title="Manage Customers" />
    <v-list-item to="/superadmin/track" prepend-icon="mdi-map-marker" title="Track Users" />
    <v-list-item to="/superadmin/products" prepend-icon="mdi-package-variant" title="Products" />
    <v-list-item to="/superadmin/orders" prepend-icon="mdi-cart" title="Orders" />
    <v-list-item to="/superadmin/settings" prepend-icon="mdi-cog" title="Settings" />
  </v-list>
</template>
