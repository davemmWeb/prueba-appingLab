<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/users'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';


const store = userStore()

const userNameOrEmail = ref('')


const getUser = () => {
    store.search_user(userNameOrEmail.value)
}

</script>

<template>
    <div v-if="store.error">
        <p>Error {{ store.error }}</p>
    </div>
    <div v-else>
        <InputText v-model="userNameOrEmail" type="text" placeholder="Enter name or email..." />
        <Button @click="getUser">Get User</Button>
        <div class="user-info" v-if="store.userCurrent">
            <div class="container-info">
                <p>
                    Nombre : {{ store.userCurrent.first_name ? store.userCurrent.first_name : 'N/A' }}
                    {{ store.userCurrent.last_name ? store.userCurrent.last_name : '' }}
                </p>
                <p>
                    Email : {{ store.userCurrent.email ? store.userCurrent.email : 'N/A' }}
                </p>

            </div>
            <div class="user-avatar">
                <img :src="store.userCurrent.avatar" :alt="store.userCurrent.first_name" class="user-avatar">
            </div>
        </div>
    </div>
</template>

<style>
input {
    margin-right: 20px;
    height: 28px;
}

.user-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: rgba(96, 101, 178, 0.068);
}

img {
    width: 80px;
    border-radius: 50%;
}

.user-avatar {
    margin-left: 4%;

}

.container-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
