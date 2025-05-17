<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="450" elevation="8" class="pa-5">
      <v-card-title class="text-h6 font-weight-bold justify-center">
        📝 Register as Customer
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleRegister" ref="formRef">
          <v-text-field
            v-model="name"
            label="Full Name"
            prepend-inner-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            prepend-inner-icon="mdi-phone"
            required
          />
          <v-text-field
            v-model="otpCode"
            label="OTP Code"
            prepend-inner-icon="mdi-key"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
          />

          <v-btn color="blue darken-1" class="mt-3" block @click="sendOtp">
            Send OTP
          </v-btn>

          <v-btn type="submit" color="success" class="mt-3" block>
            Register
          </v-btn>
        </v-form>

        <v-alert v-if="message" :type="alertType" class="mt-4" dense border="start">
          {{ message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const phoneNumber = ref('')
const otpCode = ref('')
const password = ref('')
const message = ref('')
const alertType = ref('info')
const router = useRouter()

const sendOtp = async () => {
  message.value = ''
  alertType.value = 'info'

  try {
    const res = await axios.post('http://localhost:4190/api/auth/register-otp', {
      phoneNumber: phoneNumber.value,
    })

    message.value = res.data.message || 'OTP sent successfully'
    alertType.value = 'success'
  } catch (err) {
    message.value = err.response?.data?.message || 'Failed to send OTP'
    alertType.value = 'error'
  }
}

const handleRegister = async () => {
  message.value = ''
  alertType.value = 'info'

  try {
    const res = await axios.post('http://localhost:4190/api/auth/register-otp', {
      phoneNumber: phoneNumber.value,
      otpCode: otpCode.value,
      password: password.value,
      name: name.value
    })

    const token = res.data.token
    const role = res.data.user.role

    localStorage.setItem('token', token)
    localStorage.setItem('userRole', role)

    if (role === 'customer') {
      router.push('/customer/dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    message.value = err.response?.data?.message || 'Registration failed'
    alertType.value = 'error'
  }
}
</script>
