<script setup>
import { userStore } from '../stores/users';
import Search from './Search.vue';
import Spinner from './Spinner.vue';
import { onMounted, ref, watch } from 'vue';

const store = userStore()
const { get_data_api, userList, page, totalPages, change_page } = store;

const isLoading = ref(true);
const users = ref([]);
const currentPage = ref(page);


components: {
  Spinner,
    Search
}
function fetchData() {
  isLoading.value = false;
  users.value = userList.data
}
onMounted(() => {
  get_data_api();
  fetchData();
})


function prevPage() {
  if (currentPage.value > 1) {
    change_page(currentPage.value - 1);
    fetch(`https://reqres.in/api/users?page=${currentPage.value - 1}`)
      .then(res => res.json())
      .then(data => {
        users.value = data.data;

      })
      .catch(err => console.log(err));
    currentPage.value = currentPage.value - 1;
  }
}


function nextPage() {
  if (currentPage.value < totalPages) {
    change_page(currentPage.value + 1);
    fetch(`https://reqres.in/api/users?page=${currentPage.value + 1}`)
      .then(res => res.json())
      .then(data => {
        users.value = data.data;

      })
      .catch(err => console.log(err));
    currentPage.value = currentPage.value + 1;
  }
}


</script>

<template>
  <div v-if="store.error">
    <p>Error {{ store.error }}</p>
  </div>
  <div v-else-if="isLoading || !users">
    <Spinner />
  </div>
  <div v-else class="card">
    <Search />
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
    <!-- paginacion -->

    <div class="card">
      <div class="pagination">
        <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

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
  margin-top: 10px;
}

th,
td {
  padding: 8px;
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



.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-btn {
  background-color: #044488;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.page-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  margin: 0 15px;
  font-size: 16px;
}
</style>
