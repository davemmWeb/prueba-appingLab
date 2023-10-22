<template>
  <div v-if="store.error">
    <p>Error {{ store.error }}</p>
  </div>
  <div v-else-if="isLoading || !users">
    <Spinner />
  </div>
  <div v-else>
    <Search />
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="first_name" header="First Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column header="Avatar">
        <template #body="slotProps">
          <img :src="slotProps.data.avatar" :alt="slotProps.data.first_name" class="user-avatar" />
        </template>
      </Column>
      <Column field="detail">
        <template #body="slotProps">
          <router-link :to="{ name: 'Detail', params: { id: slotProps.data.id } }" class="router-link">
            Detail
          </router-link>
        </template>
      </Column>
    </DataTable>
    <!-- paginacion -->

    <div class="card">
      <div class="pagination">
        <Button type="button" label="Yes" icon="pi pi-check" @click="prevPage"
          :disabled="currentPage === 1">Previous</Button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <Button type="button" label="No" icon="pi pi-times" @click="nextPage"
          :disabled="currentPage === totalPages">Next</Button>
      </div>
    </div>
  </div>
  <DynamicDialog />
</template>


<script setup>
import { userStore } from '../stores/users';
import Search from './Search.vue';
import Spinner from './Spinner.vue';
import { onMounted, ref, watch } from 'vue';
import { getUsersApi, getUserPage } from '../api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DynamicDialog from 'primevue/dynamicdialog';
import { useDialog } from "primevue/usedialog";
import DataUserVue from './DataUser.vue';

const dialog = useDialog();

const store = userStore()
const { get_data_api, page, totalPages, change_page } = store;

const isLoading = ref(true);
const users = ref([]);
const currentPage = ref(page);

components: {
  Spinner,
    Search
}
async function fetchData() {
  const usersApi = await getUsersApi();
  users.value = usersApi.data;
  isLoading.value = false;
}

onMounted(() => {
  get_data_api();
  fetchData();
})


async function prevPage() {
  if (currentPage.value > 1) {
    change_page(currentPage.value - 1);
    const usersPrevPage = await getUserPage(currentPage.value - 1);
    users.value = usersPrevPage.data;
    currentPage.value = currentPage.value - 1;
  }
}


async function nextPage() {
  if (currentPage.value < totalPages) {
    change_page(currentPage.value + 1);
    const usersNextPage = await getUserPage(currentPage.value + 1);
    users.value = usersNextPage.data;
    currentPage.value = currentPage.value + 1;
  }
}
function showProducts(item) {
  const dialogRef = dialog.open(DataUserVue, {
    props: {
      header: 'Users List',
      style: {
        width: '50vw',
        height: '50vh',
        backgroundColor: 'grey',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true
    },
  });
}


</script>


<style scoped>
.card {
  /* background-color: #1d1b1b00; */
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
  /* background-color: #44466033; */
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

/* .page-btn {
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
} */

.page-info {
  margin: 0 15px;
  font-size: 16px;
}
</style>
