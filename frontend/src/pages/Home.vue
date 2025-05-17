<template>
  <v-container class="py-10">
    <!-- Hero Section -->
    <v-row justify="center" class="mb-10">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h3 font-weight-bold">🛒 Welcome to My E-Commerce</h1>
        <p class="text-subtitle-1 mt-2">
          Discover amazing products and shop with ease!
        </p>
        <v-btn color="primary" class="mt-4" to="/register">Start Shopping</v-btn>
      </v-col>
    </v-row>

    <!-- Product Grid -->
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="mx-auto" elevation="4">
          <v-img :src="product.image" height="200px" cover></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-subtitle class="text-primary font-weight-bold">
            ${{ product.price }}
          </v-card-subtitle>

          <v-card-text class="text-truncate">
            {{ product.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary">View</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    image: 'https://cdn.vuetifyjs.com/images/cards/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smartwatch',
    price: 99.99,
    image: 'https://cdn.vuetifyjs.com/images/cards/smartwatch.jpg',
    description: 'Stay connected and track your fitness on the go.',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 29.99,
    image: 'https://cdn.vuetifyjs.com/images/cards/speaker.jpg',
    description: 'Crisp sound, portable size, and great battery life.',
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: 49.99,
    image: 'https://cdn.vuetifyjs.com/images/cards/fitness.jpg',
    description: 'Track your daily steps, calories, and health metrics.',
  },
])
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
