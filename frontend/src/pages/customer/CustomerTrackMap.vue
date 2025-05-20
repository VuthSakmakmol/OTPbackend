<template>
  <v-container fluid>
    <h2 class="text-h5 font-weight-bold mb-4">📍 Track Delivery</h2>

    <GMapMap
      ref="mapRef"
      :center="center"
      :zoom="14"
      style="width: 100%; height: 500px; border-radius: 12px;"
    >
      <!-- 🧍 Customer Marker -->
      <GMapMarker
        :position="center"
        :label="{ text: 'You', color: 'white' }"
        :icon="customerIcon"
      />

      <!-- 🚚 Delivery Markers -->
      <GMapMarker
        v-for="(marker, index) in deliveryMarkers"
        :key="index"
        :position="marker.position"
        :label="{ text: marker.name, color: 'white' }"
        :icon="deliveryIcon"
      />
    </GMapMap>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'

const center = ref({ lat: 11.5566, lng: 104.9282 }) // Phnom Penh fallback
const deliveryMarkers = ref([])

const customerIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
}

const deliveryIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
}

const fetchDeliveries = async () => {
  try {
    const res = await axios.get('/api/live-location/all')
    const list = res.data.data || []

    // Filter to delivery only
    deliveryMarkers.value = list
      .filter(loc => loc.role === 'delivery')
      .map(loc => ({
        position: { lat: loc.latitude, lng: loc.longitude },
        name: loc.userId?.name || 'Delivery'
      }))
  } catch (err) {
    console.error('Failed to fetch delivery locations:', err.message)
  }
}

const updateMyLocation = async (lat, lng) => {
  try {
    await axios.post('/api/live-location/update', {
      latitude: lat,
      longitude: lng
    })
    console.log('✅ Customer location updated')
  } catch (err) {
    console.error('❌ Location update failed:', err.message)
  }
}

onMounted(() => {
  // 1. Get customer's own location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        center.value = { lat: latitude, lng: longitude }
        updateMyLocation(latitude, longitude)
      },
      (err) => {
        console.warn('Geolocation failed:', err.message)
      }
    )
  }

  // 2. Fetch deliveries initially
  fetchDeliveries()

  // 3. Auto-refresh every 10 seconds
  setInterval(fetchDeliveries, 10000)
})

</script>
