<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">👋 Hello Guest!</h2>
    <p>Welcome to <strong>Dalin E-Commerce</strong>. You are currently browsing as a guest.</p>

    <v-row class="mt-6" dense>
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-img height="180" src="https://via.placeholder.com/400x200.png?text=Product+1" />
          <v-card-title>Sample Product 1</v-card-title>
          <v-card-subtitle>$19.99</v-card-subtitle>
          <v-card-text>Amazing features for your everyday needs.</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-img height="180" src="https://via.placeholder.com/400x200.png?text=Product+2" />
          <v-card-title>Sample Product 2</v-card-title>
          <v-card-subtitle>$29.99</v-card-subtitle>
          <v-card-text>Perfect companion for modern life.</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-btn class="mt-6" color="primary" @click="goToRegister">
      🚀 Register Now to Become a Customer
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>
