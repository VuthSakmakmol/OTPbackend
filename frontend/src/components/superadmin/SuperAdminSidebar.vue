<template>
  <v-navigation-drawer app permanent width="260">
    <v-list dense>
      <v-list-item-title class="text-h6 text-center mt-3">SuperAdmin</v-list-item-title>
      <v-divider class="my-3" />

      <v-list-item
        to="/superadmin/dashboard"
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
      />
      <v-list-item
        to="/superadmin/users"
        prepend-icon="mdi-account-group"
        title="Manage Users"
      />
      <v-list-item
        to="/superadmin/products"
        prepend-icon="mdi-package-variant"
        title="Products"
      />
      <v-list-item
        to="/superadmin/orders"
        prepend-icon="mdi-cart"
        title="Orders"
      />
      <v-list-item
        to="/superadmin/settings"
        prepend-icon="mdi-cog"
        title="Settings"
      />
    </v-list>
  </v-navigation-drawer>
</template>
