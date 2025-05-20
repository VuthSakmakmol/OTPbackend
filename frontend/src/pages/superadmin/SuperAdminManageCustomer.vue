<template>
  <v-container>
    <v-row class="align-center justify-space-between mb-4">
      <h2 class="text-h5 font-weight-bold">🧑‍💼 Manage Customers</h2>
      <v-btn color="primary" @click="openDialog()">Add New Customer</v-btn>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="customerList"
      :search="search"
      class="elevation-1"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="Search by Name or Phone"
          prepend-inner-icon="mdi-magnify"
          clearable
          class="mx-4 mt-2"
        />
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteCustomer(item._id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #[`item.isVerified`]="{ item }">
        <v-chip :color="item.isVerified ? 'green' : 'grey'" dark small>
          {{ item.isVerified ? 'Yes' : 'No' }}
        </v-chip>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
          {{ editedItem._id ? 'Edit Customer' : 'Add New Customer' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveCustomer">
            <v-text-field v-model="editedItem.name" label="Full Name" required />
            <v-text-field v-model="editedItem.phoneNumber" label="Phone Number" required />
            <v-text-field v-model="editedItem.email" label="Email" type="email" />
            <v-select
              v-model="editedItem.gender"
              :items="['male', 'female', 'other']"
              label="Gender"
            />
            <v-text-field
              v-model="editedItem.password"
              label="Password"
              type="password"
              :rules="[v => !editedItem._id || !!v || 'Password required']"
              :required="!editedItem._id"
            />
            <v-checkbox v-model="editedItem.isVerified" label="Verified Account" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveCustomer">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios' // ✅ Direct axios instance

const customerList = ref([])
const search = ref('')
const dialog = ref(false)
const editedItem = ref({})

// Table headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Phone Number', key: 'phoneNumber' },
  { title: 'Email', key: 'email' },
  { title: 'Gender', key: 'gender' },
  { title: 'Verified', key: 'isVerified' },
  { title: 'Actions', key: 'actions', sortable: false }
]

// ✅ Load all customers
const fetchCustomers = async () => {
  try {
    const res = await api.get('/getAllDocs/User')
    customerList.value = res.data.data.filter(u => u.role === 'customer')
  } catch (err) {
    console.error('Fetch failed:', err)
  }
}

// ✅ Open form
const openDialog = (item = null) => {
  editedItem.value = item
    ? { ...item }
    : {
        name: '',
        phoneNumber: '',
        email: '',
        gender: 'other',
        password: '',
        isVerified: true,
        role: 'customer',
        createdBy: localStorage.getItem('userRole') || 'superadmin'
      }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editedItem.value = {}
}

// ✅ Save new or updated customer
const saveCustomer = async () => {
  try {
    const payload = { fields: { ...editedItem.value, role: 'customer' } }

    const url = editedItem.value._id
      ? `/updateDoc/User/${editedItem.value._id}`
      : `/insertDoc/User`

    const method = editedItem.value._id ? 'patch' : 'post'

    await api[method](url, payload)

    closeDialog()
    fetchCustomers()
  } catch (err) {
    alert('Save failed: ' + (err.response?.data?.message || err.message))
  }
}

// ✅ Delete
const deleteCustomer = async (id) => {
  if (!confirm('Are you sure you want to delete this customer?')) return
  try {
    await api.delete(`/deleteDoc/User/${id}`)
    fetchCustomers()
  } catch (err) {
    alert('Delete failed: ' + (err.response?.data?.message || err.message))
  }
}

onMounted(fetchCustomers)
</script>
