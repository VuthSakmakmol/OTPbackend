<template>
  <v-container fluid>
    <h2 class="text-h6 font-weight-bold mb-4">📍 Real-time Tracking (SuperAdmin)</h2>

    <GMapMap
      :center="center"
      :zoom="13"
      map-type-id="roadmap"
      style="width: 100%; height: 600px"
    >
      <GMapMarker
        v-for="user in users"
        :key="user._id"
        v-if="user && isValidLatLng(user.latitude, user.longitude)"
        :position="{ lat: user.latitude, lng: user.longitude }"
        :icon="getMarkerIcon(user.role)"
        :title="user.name"
      />
    </GMapMap>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import axios from '@/plugins/axios'

// Default center: Phnom Penh
const center = ref({ lat: 11.556, lng: 104.928 })
const users = ref([])

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4190')

const isValidLatLng = (lat, lng) => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)
}

const getMarkerIcon = (role) => {
  if (role === 'customer') return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  if (role === 'delivery') return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
  return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
}

const fetchDeliveries = async () => {
  try {
    const res = await axios.get('/live-location/all')
    if (Array.isArray(res.data)) {
      users.value = res.data.filter(
        u => u && typeof u.latitude === 'number' && typeof u.longitude === 'number'
      )
    } else {
      users.value = []
    }
  } catch (err) {
    console.error('❌ Failed to fetch users:', err)
  }
}

onMounted(() => {
  fetchDeliveries()

  socket.on('locationUpdated', (data) => {
    const index = users.value.findIndex(u => u?.userId?._id === data.userId)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...data }
    } else {
      users.value.push(data)
    }
  })

  setInterval(fetchDeliveries, 10000)
})
</script>
