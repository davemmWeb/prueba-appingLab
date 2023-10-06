<template>
    <div class="card">
        <div class="pagination">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
            <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { userStore } from "../stores/users";

const store = userStore();
const { change_page, totalPages, page } = store;


const currentPage = ref(page);

function prevPage() {
    if (currentPage.value > 1) {
        fetch(`https://reqres.in/api/users?page=${currentPage.value - 1}`)
            .then(res => res.json())
            .then(data => {
                change_page(data);
            })
            .catch(err => {
                console.log(err);
            })
        currentPage.value = currentPage.value - 1;
    }
}

function nextPage() {
    if (currentPage.value < totalPages) {
        fetch(`https://reqres.in/api/users?page=${currentPage.value + 1}`)
            .then(res => res.json())
            .then(data => {
                change_page(data);
            })
            .catch(err => {
                console.log(err);
            })
        currentPage.value = currentPage.value + 1;
    }
}



</script>
  
<style scoped>
.card {
    /* Estilos para el contenedor card (como se definió previamente) */
}

.user-table {
    /* Estilos para la tabla (como se definió previamente) */
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.page-btn {
    background-color: #007bff;
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
  
  
  