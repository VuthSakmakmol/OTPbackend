<template>
  <v-container>
    <v-row class="align-center justify-space-between mb-4">
      <h2 class="text-h5 font-weight-bold">👨‍💼 Manage Staff (Admin & Delivery)</h2>
      <v-btn color="primary" @click="openDialog()">ADD NEW STAFF</v-btn>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="staffList"
      :search="search"
      class="elevation-1"
    >
      <template #top>
        <v-text-field v-model="search" label="Search" class="mx-4 mt-2" clearable />
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteStaff(item._id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
          {{ editedItem._id ? 'Edit Staff' : 'Add New Staff' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveStaff">
            <v-text-field v-model="editedItem.name" label="Full Name" required />
            <v-text-field v-model="editedItem.phoneNumber" label="Phone Number" required />
            <v-select
              v-model="editedItem.role"
              :items="['admin', 'delivery']"
              label="Role"
              required
            />
            <v-text-field
              v-model="editedItem.password"
              label="Password"
              type="password"
              :rules="[v => !editedItem._id || !!v || 'Password required']"
              :required="!editedItem._id"
            />
            <v-checkbox
              v-model="editedItem.isVerified"
              label="Verified Account"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveStaff">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const $api = proxy.$api

const staffList = ref([])
const search = ref('')
const dialog = ref(false)
const editedItem = ref({})

// Default role context
const createdBy = localStorage.getItem('userRole') || 'superadmin'

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Phone Number', key: 'phoneNumber' },
  { title: 'Role', key: 'role' },
  { title: 'Verified', key: 'isVerified' },
  { title: 'Actions', key: 'actions', sortable: false }
]

// ✅ Load Staff
const fetchStaff = async () => {
  try {
    const res = await $api.get('/getAllDocs/User')
    staffList.value = res.data.data.filter(u => ['admin', 'delivery'].includes(u.role))
  } catch (err) {
    console.error('Fetch failed:', err)
  }
}

// ✅ Open dialog for create/edit
const openDialog = (item = null) => {
  editedItem.value = item
    ? { ...item }
    : {
        name: '',
        phoneNumber: '',
        role: '',
        password: '',
        isVerified: true,
        createdBy
      }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editedItem.value = {}
}

// ✅ Save (create or update)
const saveStaff = async () => {
  try {
    const payload = { fields: { ...editedItem.value } }

    const url = editedItem.value._id
      ? `/updateDoc/User/${editedItem.value._id}`
      : `/insertDoc/User`

    const method = editedItem.value._id ? 'patch' : 'post'

    await $api[method](url, payload)

    closeDialog()
    fetchStaff()
  } catch (err) {
    alert('Save failed: ' + (err.response?.data?.message || err.message))
  }
}

// ✅ Delete
const deleteStaff = async (id) => {
  if (!confirm('Delete this staff member?')) return
  try {
    await $api.delete(`/deleteDoc/User/${id}`)
    fetchStaff()
  } catch (err) {
    alert('Delete failed: ' + (err.response?.data?.message || err.message))
  }
}

onMounted(fetchStaff)
</script>
