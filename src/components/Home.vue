<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/users';
const store = useUserStore();

const { fetchApi, listUsers } = store

defineProps({
  msg: String,
})

const count = ref(0)

fetchApi();

const users = listUsers.data

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <!-- <button type="button" @click="count++">count is {{ count }}</button> -->
    <p>Counter: {{ store.count }}</p>
    <ul>
      <li>
        <router-link to="/detail/2">Detail</router-link>

      </li>
      <li>
        <router-link to="/detail/3">Detail 2</router-link>
      </li>
    </ul>
    <h1>List Users</h1>
    <table>
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Fisrt Name
          </th>
          <th>
            Last Name
          </th>
          <th>
            Email
          </th>
          <th>
            Avatar
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users">
          <td>{{ user?.id }}</td>
          <td>{{ user?.first_name }}</td>
          <td>{{ user?.last_name }}</td>
          <td>{{ user?.email }}</td>
          <router-link :to="{ name: 'Detail', params: { id: user.id } }">
            <td><img :src="user?.avatar" alt="{{ user?.first_name }}"></td>

          </router-link>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
