<script setup>
import { onMounted, ref } from 'vue';
import Spinner from './Spinner.vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const router = useRouter();
const user = ref([]);

const isLoading = ref(true);

components: {
    Spinner
}

const getUser = async (id) => {
    try {
        const res = await fetch(`https://reqres.in/api/users/${id}`);
        const data = await res.json();
        user.value = [data.data]
        isLoading.value = false;
    } catch (error) {
        console.log('error', error);
    }
}

onMounted(() => {
    getUser(router.currentRoute.value.params.id);
})

</script>

<template >
    <div v-if="isLoading">
        <Spinner />
    </div>
    <div v-else class="detail-container">
        <router-link class="router-link" :to="{ name: 'Home' }">Home</router-link>
        <div class="user-info">
            <DataTable :value="user" tableStyle="min-width: 50rem">
                <Column field="first_name" header="First Name"></Column>
                <Column field="last_name" header="Last Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="avatar" header="Avatar">
                    <template #body="slotProps">
                        <img :src="slotProps.data.avatar" :alt="slotProps.data.first_name" class="user-avatar" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
  
<style scoped>
.detail-container {
    text-align: center;
    justify-content: center;
    width: 60%;
}

.user-info {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #0f0e0e44;
    box-shadow: 0 2px 4px rgba(244, 242, 242, 0.802);
}

.user-info h1 {
    margin: 10px 0;
    font-size: 20px;
    color: #ebeff3;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
}

.user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10px;
    object-fit: cover;
}

.loading-spinner {
    margin-top: 20px;
}

.router-link {
    font-family: 'Courier New', Courier, monospace;
    color: #007bff;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        color: #ebeff3;
    }
}
</style>
  