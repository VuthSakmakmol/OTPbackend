<template>
  <v-container fluid>
    <h2 class="text-h6 font-weight-bold mb-4">📍 My Live Location (Delivery)</h2>

    <GMapMap
      :center="position"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 600px"
    >
      <GMapMarker
        v-if="position"
        :position="position"
        icon="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        title="You (Delivery)"
      />
    </GMapMap>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const position = ref({ lat: 11.556, lng: 104.928 }) // Default to Phnom Penh
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4190')

// Get current user from local storage or auth context
const user = JSON.parse(localStorage.getItem('user') || '{}')

const updatePosition = (coords) => {
  const { latitude, longitude } = coords
  position.value = { lat: latitude, lng: longitude }

  // Send location to backend
  socket.emit('updateLocation', {
    userId: user._id,
    role: user.role || 'delivery',
    name: user.name || 'Delivery',
    latitude,
    longitude
  })
}

const handleLocationError = (err) => {
  console.error('Geolocation error:', err)
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updatePosition, handleLocationError)

    // 🔁 Track movement
    navigator.geolocation.watchPosition(updatePosition, handleLocationError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    })
  } else {
    alert('Geolocation is not supported by your browser.')
  }
})
</script>
