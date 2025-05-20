<script setup>
import { onMounted } from 'vue'
import axios from '@/plugins/axios'

const updateLocation = async (lat, lng) => {
  try {
    await axios.post('/live-location/update', {
      latitude: lat,
      longitude: lng,
    })
    console.log('✅ Location updated:', lat, lng)
  } catch (err) {
    console.error('❌ Failed to update location:', err.message)
  }
}

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        updateLocation(latitude, longitude)
      },
      (err) => console.error('Location error:', err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    )
  }
})
</script>
