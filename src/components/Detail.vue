<script>
import { useUserStore } from '../stores/users';

export default {
    setup() {
        const store = useUserStore();
        const { user } = store;

        // Accede al parámetro de ruta "id" usando $route.params.id
        const userId = $route.params.id;

        // Imprime el ID para verificar
        console.log('user', userId);

        return {
            user,
        };
    },
};

</script>

<template>
    <h1>Details {{ user?.first_name }}</h1>
</template>