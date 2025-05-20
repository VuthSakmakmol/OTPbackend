<template>
  <GMapMap
    :center="center"
    :zoom="15"
    style="height: 500px; width: 100%; border-radius: 12px; overflow: hidden;"
  >
    <GMapMarker :position="center" />
  </GMapMap>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const center = ref({ lat: 11.5565521, lng: 104.8805006 }) // Default: Phnom Penh

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        center.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
      },
      (err) => {
        console.warn('Geolocation error:', err.message)
      }
    )
  } else {
    alert('Geolocation is not supported by your browser')
  }
})
</script>
