<script>
import { userStore } from '../stores/users';
import Spinner from './Spinner.vue';

const store = userStore();
const { user } = store;
export default {
    name: "Detail",
    components: {
        Spinner
    },
    data() {
        return {
            user: {},
            isLoading: true
        }
    },
    methods: {
        async getUserId(id) {
            fetch(`https://reqres.in/api/users/${id}`)
                .then(res => res.json())
                .then(data => {
                    this.user = data.data
                    this.isLoading = false
                })
        }

    },
    mounted() {
        this.getUserId(this.$route.params.id);
    },

}

</script>

<template>
    <div v-if="user && isLoading">
        <Spinner></Spinner>
    </div>
    <div v-else class="detail-container">
        <!-- <a href="/">Home</a> -->
        <router-link class="router-link" :to="{ name: 'Home' }">Home</router-link>
        <div class="user-info" v-if="user">
            <h1>Name: {{ user?.first_name }} - {{ user?.last_name }}</h1>
            <h1>Email: {{ user?.email }}</h1>
            <img :src="user?.avatar" :alt="user?.first_name" class="user-avatar">
        </div>
        <div v-else>
            <div class="loading-spinner">
                <Spinner></Spinner>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.detail-container {
    text-align: center;
    padding: 20px;
}

a {
    text-decoration: none;
    color: #007bff;
    font-size: 26px;
    border: #0f0e0e44 solid 1px;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(244, 242, 242, 0.802);
    transition: all 300ms;
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

    &:hover {
        color: #ebeff3;
    }
}
</style>
  