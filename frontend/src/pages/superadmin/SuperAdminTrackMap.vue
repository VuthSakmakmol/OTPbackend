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
        :key="user._id || user.userId?._id || Math.random()"
        v-if="user && isValidLatLng(getLat(user), getLng(user))"
        :position="{ lat: getLat(user), lng: getLng(user) }"
        :icon="getMarkerIcon(getRole(user))"
        :title="`${getName(user)} (${getRole(user)})`"
      />
    </GMapMap>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import axios from '@/plugins/axios'

const center = ref({ lat: 11.556, lng: 104.928 }) // Phnom Penh
const users = ref([])

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4190')

// 🔁 Fetch all users initially and every 10s
const fetchAllLiveUsers = async () => {
  try {
    const res = await axios.get('/live-location/all')
    users.value = res.data || []
  } catch (err) {
    console.error('❌ Failed to fetch users:', err)
  }
}

// ✅ Helpers to normalize data
const getLat = (user) => user.latitude || user.userId?.latitude || null
const getLng = (user) => user.longitude || user.userId?.longitude || null
const getName = (user) => user.name || user.userId?.name || 'Unknown'
const getRole = (user) => user.role || user.userId?.role || 'unknown'

const isValidLatLng = (lat, lng) => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)
}

const getMarkerIcon = (role) => {
  if (role === 'customer') return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  if (role === 'delivery') return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
  if (role === 'admin') return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
  if (role === 'superadmin') return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
  return 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
}

// 🚀 Live updates
onMounted(() => {
  fetchAllLiveUsers()

  socket.on('locationUpdated', (data) => {
    const index = users.value.findIndex(u => u.userId?._id === data.userId)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...data }
    } else {
      users.value.push(data)
    }
  })

  setInterval(fetchAllLiveUsers, 10000)
})
</script>
