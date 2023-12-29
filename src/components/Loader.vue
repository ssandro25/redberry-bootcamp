<template>
    <div class="loader mt-0 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status"></div>
    </div>
</template>

<script>
export default {
    name: "v-loader"
}
</script>

<style scoped lang="scss">
.loader {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    background-color: #fff;
    height: 100vh;
    width: 100vw;
}
</style>