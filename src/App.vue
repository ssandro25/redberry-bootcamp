<template>
    <Header/>

    <main>
        <router-view/>
    </main>

</template>

<script>
import Header from "@/components/Header.vue";
import axios from 'axios';

// import Api from "@/requests/Request"
// const api = new Api()

export default {
    components: {
        Header
    },

    mounted() {
        axios.defaults.baseURL = 'https://api.blog.redberryinternship.ge/api/'

        this.baseToken()

        // api.getBlogs().then(response => {
        //     console.log(response.data)
        // })
    },

    methods: {
        // baseToken() {
        //     axios.defaults.headers.common.Authorization = "Bearer 16023cff12f3008b4b9819629d88bad9b7cd73ba78988e738a156e41c1412ef0";
        // },

        baseToken() {
            axios.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = 'Bearer 16023cff12f3008b4b9819629d88bad9b7cd73ba78988e738a156e41c1412ef0';
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
    }
}
</script>
