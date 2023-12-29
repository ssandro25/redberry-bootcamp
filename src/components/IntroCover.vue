<template>
    <section class="intro container d-none d-lg-flex align-items-center justify-content-between">
        <h1 class="intro__title">ბლოგი</h1>

        <img :src="CoverBg" alt="">
    </section>
</template>

<script>
import CoverBg from "@/assets/images/cover-bg.png"
export default {
    name: "IntroCover",

    data() {
        return {
            CoverBg
        }
    }
}
</script>

<style scoped lang="scss">
.intro {
    padding-top: 64px;

    &__title {
        color: #1A1A1F;
        font-size: 64px;
        font-weight: 700;
    }
}
</style>