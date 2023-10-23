<template>
  <div class="card flex justify-content-center">
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
      <Column>
        <template #body="slotProps">
          <Button label="permissions..." link @click="showProducts(slotProps)" />
        </template>
      </Column>
    </DataTable>

  </div>
  <div class="card flex justify-content-center">
    <Toast />
    <DynamicDialog />
  </div>
</template>

<script setup>
import { markRaw, defineAsyncComponent, ref, onMounted } from 'vue';
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { getUsersApi } from './api';
import { userStore } from '@/stores/users'

const DataUser = defineAsyncComponent(() => import('./components/DataUser.vue'))

const dialog = useDialog();
const toast = useToast();

const users = ref([]);
const isLoading = ref(true);

const store = userStore();
const { get_data_api } = store


const showProducts = (user) => {
  const dialogRef = dialog.open(DataUser, {
    props: {
      header: 'Assigned permissions to ' + user.data.first_name + ' ' + user.data.last_name,
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true
    },
    data: {
      user: user.data
    },
    // templates: {
    //   footer: markRaw(FooterDemo)
    // },
    onClose: (options) => {
      const data = options.data;
      if (data) {
        const buttonType = data.buttonType;
        const summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data.name };

        toast.add({ severity: 'info', ...summary_and_detail, life: 3000 });
      }
    }
  });
}

const fetchData = async () => {
  const userList = await get_data_api()
  users.value = userList.data
  // isLoading.value = false;
}

onMounted(() => {
  fetchData();
})

</script>
