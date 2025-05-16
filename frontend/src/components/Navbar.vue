<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Dalin E-Commerce</v-toolbar-title>
    <v-spacer />
    <v-btn v-if="isGuest" @click="goTo('/login')">Login</v-btn>
    <v-btn v-if="isGuest" @click="goTo('/register')">Register</v-btn>
    <v-btn v-else @click="logout" color="error">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isGuest() {
      return !localStorage.getItem("role");
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    logout() {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      this.$router.push("/");
    }
  }
}
</script>
