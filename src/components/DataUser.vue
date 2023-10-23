<template>
    <div class="card">
        <DataTable :value="permissios" scrollable scrollHeight="400px" tableStyle="min-width: 20rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Permissions"></Column>
            <Column style="flex: 0 0 4rem">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-plus" text size="small" @click="toggleLock(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <div class="flex justify-content-end mt-1 mb-3">
        <Button icon="pi pi-external-link" label="Show Permissions" outlined severity="success" @click="showInfo" />
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { getPermissions } from '../api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import { userStore } from '@/stores/users';
import InfoUser from "./InfoUser.vue"
import { useDialog } from "primevue/usedialog";

const dialog = useDialog();

const dialogRef = inject("dialogRef");

const permissios = ref();

const store = userStore();

const showMessage = ref(false);

const { give_permission } = store;


const toggleLock = (permissions) => {
    give_permission(dialogRef.value.data.user.id, permissions);
}

const showInfo = () => {
    dialog.open(InfoUser, {
        props: {
            header: "Permissions assigned",
            style: { width: "30vw" },
            modal: true,
            dismissableMask: true,
        },
        data: {
            user: dialogRef.value.data.user
        }
    });
};

onMounted(() => {
    permissios.value = getPermissions;
});

</script>


