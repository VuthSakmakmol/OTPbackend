<template>
  <v-container max-width="500px">
    <h2 class="text-h5 font-weight-bold mb-4">📱 Register as Customer</h2>

    <v-form @submit.prevent="verifyOtp">
      <v-text-field v-model="form.name" label="Name" required />
      <v-text-field v-model="form.phoneNumber" label="Phone Number (e.g., +85512345678)" required />

      <div id="recaptcha-container" class="my-2"></div>
      <v-btn @click.prevent="sendOtp" color="primary" :disabled="otpSent">
        {{ otpSent ? 'OTP Sent' : 'Send OTP' }}
      </v-btn>

      <v-text-field v-model="form.otpCode" label="OTP Code" class="mt-4" required />
      <v-text-field v-model="form.password" label="Password" type="password" required />

      <v-btn color="success" class="mt-4" type="submit">✅ Verify & Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  phoneNumber: '',
  otpCode: '',
  password: ''
})

const otpSent = ref(false)
let confirmationResult = null

const firebaseConfig = {
  apiKey: "AIzaSyBQkP_mclJ6KvcaK3k5cuPr_ac49fWyE0E",
  authDomain: "ecommerceotp-82dba.firebaseapp.com",
  projectId: "ecommerceotp-82dba",
  storageBucket: "ecommerceotp-82dba.appspot.com",
  messagingSenderId: "705100722019",
  appId: "1:705100722019:web:29da22e5a2305186a2ed56",
  measurementId: "G-KZEHPBQZPX"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'normal',
  callback: () => console.log('reCAPTCHA solved'),
  'expired-callback': () => alert('reCAPTCHA expired. Try again')
})

const sendOtp = async () => {
  try {
    confirmationResult = await signInWithPhoneNumber(auth, form.value.phoneNumber, window.recaptchaVerifier)
    otpSent.value = true
    alert('✅ OTP sent!')
  } catch (e) {
    alert("❌ OTP send failed: " + e.message)
  }
}

const verifyOtp = async () => {
  try {
    const result = await confirmationResult.confirm(form.value.otpCode)
    const phone = result.user.phoneNumber

    const res = await fetch("http://localhost:4190/api/auth/register-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.value.name,
        phoneNumber: phone,
        password: form.value.password,
        otpCode: "verified" // backend may ignore this if using Firebase trust
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert("✅ Registered!")
      localStorage.setItem("role", "customer")
      router.push("/customer/dashboard")
    } else {
      alert("❌ Registration failed: " + data.message)
    }
  } catch (e) {
    alert("❌ OTP verification failed: " + e.message)
  }
}
</script>
