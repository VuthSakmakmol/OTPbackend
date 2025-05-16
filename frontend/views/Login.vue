<template>
  <v-container max-width="500px">
    <h2 class="text-h5 font-weight-bold mb-4">🔐 Login</h2>

    <v-form @submit.prevent="login">
      <v-text-field v-model="form.phoneNumber" label="Phone Number" required />
      <v-text-field v-model="form.password" label="Password" type="password" required />

      <v-btn color="primary" class="mt-4" type="submit">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  phoneNumber: '',
  password: ''
})

const login = async () => {
  try {
    const res = await fetch('http://localhost:4190/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)

      // 🔀 Redirect based on role
      switch (data.user.role) {
        case 'superadmin':
          router.push('/superadmin/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'delivery':
          router.push('/delivery/dashboard')
          break
        case 'customer':
          router.push('/customer/dashboard')
          break
        default:
          alert('Unknown role')
      }
    } else {
      alert('❌ Login failed: ' + data.message)
    }
  } catch (e) {
    alert('❌ Error: ' + e.message)
  }
}
</script>
