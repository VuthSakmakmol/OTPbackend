<template>
  <v-container fluid>
    <h2 class="text-h6 font-weight-bold mb-4">🚚 Delivery Live Tracking</h2>

    <v-btn
      color="warning"
      class="mb-4"
      @click="enableLocation"
      :disabled="locationEnabled"
    >
      📍 Allow Location Access
    </v-btn>

    <GMapMap
      v-if="position"
      :center="position"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 600px"
    >
      <GMapMarker
        :position="position"
        icon="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        title="You (Delivery)"
      />
    </GMapMap>

    <div v-else class="text-center mt-10">
      <v-progress-circular indeterminate color="warning" size="40" />
      <p class="mt-2">Waiting for GPS permission...</p>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const position = ref(null)
const locationEnabled = ref(false)
const user = JSON.parse(localStorage.getItem('user') || '{}')
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4190')

const enableLocation = () => {
  if (!user._id) {
    alert('You are not logged in. Please log in again.')
    return
  }

  if ('geolocation' in navigator) {
    locationEnabled.value = true

    navigator.geolocation.getCurrentPosition(updatePosition, handleError)
    navigator.geolocation.watchPosition(updatePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  } else {
    alert('Your browser does not support GPS')
  }
}

const updatePosition = ({ coords }) => {
  const { latitude, longitude } = coords
  position.value = { lat: latitude, lng: longitude }

  socket.emit('updateLocation', {
    userId: user._id,
    role: 'delivery',
    name: user.name || 'Delivery',
    latitude,
    longitude
  })
}

const handleError = (err) => {
  console.error('❌ GPS Error:', err)
}
</script>
