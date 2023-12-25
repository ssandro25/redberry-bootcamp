<template>
    <AuthorizationModal/>

    <header class="header container-fluid bg-white sticky-top">
        <nav :class="['navigation container d-flex align-items-center', {
            'justify-content-center' : $route.name === 'add-blog',
            'justify-content-between' : $route.name !== 'add-blog'
        }]">
            <router-link to="/">
                <img :src="Logo" title="Redberry" alt="Redberry logo">
            </router-link>

            <button
                v-if="!authorized"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#authorizationModal"
            >
                შესვლა
            </button>

            <router-link
                v-if="authorized && $route.name !== 'add-blog'"
                :to="{ name: 'add-blog' }"
                class="btn btn-primary">
                დაამატე ბლოგი
            </router-link>
        </nav>
    </header>

</template>

<script>
import Logo from "@/assets/images/logo.png"
import AuthorizationModal from "@/components/AuthorizationModal.vue";

export default {
    name: "v-header",

    components: {
        AuthorizationModal
    },

    data() {
        return {
            authorized: Boolean(localStorage.getItem('authorized')),
            Logo
        }
    },

    mounted() {
        console.log(this.getAuthorized)
    }
}
</script>


<style lang="scss">
.header {
    border-bottom: 1px solid #E4E3EB;

    .navigation {
        padding: 20px 0;
    }
}

</style>