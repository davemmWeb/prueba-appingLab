<template>
    <div class="card flex justify-content-center">
        <Button label="Check" icon="pi pi-check" />
    </div>
    <div>
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';


const products = [
    {
        "code": "f230fh0g3",
        "name": "Mouse",
        "category": "Electronics",
        "quantity": 100
    },
    {
        "code": "nvklal433",
        "name": "Keyboard",
        "category": "Electronics",
        "quantity": 200
    },
    {
        "code": "zz21cz3c1",
        "name": "Monitor",
        "category": "Electronics",
        "quantity": 300
    },
    {
        "code": "244wgerg2",
        "name": "Speaker",
        "category": "Electronics",
        "quantity": 400
    }
]
</script>