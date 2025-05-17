<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="400" elevation="6" class="pa-4">
      <v-card-title class="text-h6 font-weight-bold justify-center">🔐 Login</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin" ref="formRef">
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            prepend-inner-icon="mdi-phone"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
          />

          <v-btn type="submit" color="primary" block class="mt-4">Login</v-btn>
        </v-form>

        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-4"
          dense
          border="start"
        >
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const phoneNumber = ref('')
const password = ref('')
const errorMessage = ref('')
const formRef = ref(null)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    const res = await axios.post('http://localhost:4190/api/auth/login', {
      phoneNumber: phoneNumber.value,
      password: password.value,
    })

    const token = res.data.token
    const user = res.data.user

    if (!user || !user.role) throw new Error('Invalid response from server')

    // Store token & role
    localStorage.setItem('token', token)
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('userData', JSON.stringify(user))

    // ✅ Redirect by role
    if (user.role === 'superadmin') {
      router.push('/superadmin/dashboard')
    } else if (user.role === 'customer') {
      router.push('/customer/dashboard')
    } else if (user.role === 'delivery') {
      router.push('/delivery/dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed'
  }
}
</script>
