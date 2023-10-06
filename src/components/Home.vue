<template>
  <div v-if="isLoading || !users">
    <Spinner />
  </div>
  <div v-else class="card">
    <input type="number" id="search" v-model="nameId" placeholder="Search..." />
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Avatar</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user?.id }}</td>
          <td>{{ user?.first_name }}</td>
          <td>{{ user?.last_name }}</td>
          <td>{{ user?.email }}</td>
          <td>
            <img :src="user?.avatar" :alt="user?.first_name" class="user-avatar">
          </td>
          <router-link :to="{ name: 'Detail', params: { id: user?.id } }">
            <td>Detail...</td>
          </router-link>

        </tr>
      </tbody>

    </table>
    <Pagination />
  </div>
</template>

<script setup>
import { userStore } from '../stores/users';
import Pagination from './Pagination.vue';
import Spinner from './Spinner.vue';
import { onMounted, ref, watchEffect } from 'vue';

const store = userStore()
const { set_users, userList } = store;

const users = ref([]);
const isLoading = ref(true);
const nameId = ref(1)
const API_URL = 'https://reqres.in/api/users';

components: {
  Pagination,
    Spinner
}

function fetchData() {
  fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(data => {
      users.value = data.data
      set_users(data)
    })
    .catch(err => {
      console.log(err)
    })
  isLoading.value = false;
  users.value = userList.data
}


// watchEffect(async () => {
//   const url = `${API_URL}/${nameId.value}`
//   users.value = await (await fetch(url)).json()
//   isLoading.value = false
// })

onMounted(() => {
  fetchData()
})

</script>

<style scoped>
.card {
  background-color: #1d1b1b00;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 2px 4px 6px rgba(32, 40, 97, 0.447);
  margin-top: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 13px;
  text-align: left;
}

th {
  background-color: #44466033;
  font-weight: bold;
  border: 1px solid #cccccc0a;

}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
