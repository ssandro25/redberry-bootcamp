<template>
    <header class="container-fluid">
        <nav class="container d-flex align-items-center justify-content-between">
            <router-link to="/">
                <img :src="Logo" title="Redberry" alt="Redberry logo">
            </router-link>

            <button class="btn btn-primary">
                შესვლა
            </button>
        </nav>
    </header>
</template>

<script>
import Logo from "@/assets/images/logo.png"
export default {
    name: "v-header",

    data() {
        return {
            Logo
        }
    }
}
</script>


<style lang="scss">
nav {
    padding: 20px 0;
}
</style>