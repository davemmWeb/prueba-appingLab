
<template>
    <div class="card flex justify-content-center">
        <DataTable :value="permissions" tableStyle="min-width: 20rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
        </DataTable>

    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { userStore } from "@/stores/users";
import Column from "primevue/column";
import DataTable from "primevue/datatable";

const store = userStore();

const { get_permission } = store

const permissions = ref(null);
const dialogRef = inject("dialogRef");

onMounted(() => {
    permissions.value = get_permission(dialogRef.value.data.user.id);
});

const closeDialog = () => {
    dialogRef.value.close();
};
</script>
                            