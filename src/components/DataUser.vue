<template>
    <div>

        <DataTable :value="user" tableStyle="min-width: 30rem">
            <Column field="id" header="ID"></Column>
            <Column field="first_name" header="First Name"></Column>
            <Column field="last_name" header="Last Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="slotProps.data.avatar" :alt="slotProps.data.first_name" class="shadow-2 w-4rem" />
                </template>
                <h1>Image</h1>
            </Column>

            <Column style="width:5rem">
                <!-- <template #body="slotProps">
                    <Button type="button" icon="pi pi-plus" text rounded @click="selectProduct(slotProps.data)"></Button>
                </template> -->
                <h1>Button</h1>
            </Column>
        </DataTable>
        <div class="flex justify-content-end mt-1 mb-3">
            <Button icon="pi pi-external-link" label="Nested Dialog" outlined severity="success" @click="showInfo" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useDialog } from "primevue/usedialog";
import { getUserId } from '../api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

const dialogRef = inject("dialogRef");
const dialog = useDialog();
const user = ref(null);

async function getUser() {
    const usersApi = await getUserId(dialogRef.value.data.user.id);
    user.value = [usersApi.data];
}

onMounted(() => {
    getUser();
});


const selectProduct = (data) => {
    dialogRef.value.close(data);
};

const showInfo = () => {
    // dialog.open(InfoDemo, {
    //     props: {
    //         header: "Information",
    //         modal: true,
    //         dismissableMask: true,
    //     },
    //     data: {
    //         totalProducts: products.value ? products.value.length : 0,
    //     }
    // });
    alert("hola");
};
</script>
