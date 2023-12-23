<template>
    <Header/>

    <main>
        <router-view/>
    </main>

</template>

<script>
import Header from "@/components/Header.vue";

import axios from 'axios';

import Api from "@/requests/Request"

const api = new Api()

export default {
    components: {
        Header
    },

    data() {
        return {
            dataTest: null
        }
    },
    mounted() {
        axios.defaults.baseURL = 'https://api.blog.redberryinternship.ge/api/'

        this.baseToken()

        this.checkToken()
    },

    methods: {
        baseToken() {
            axios.defaults.headers.common.Authorization = "Bearer 3c3957778b90971d29907fc5991275a389bfabdb6b3be20c97ee4c38590bc94e";
        },

        checkToken() {
            api.getBlogs().then(response => {
                this.dataTest = response

                // console.log(response)
            })
        }
    }
}
</script>
