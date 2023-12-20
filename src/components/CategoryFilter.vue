<template>
    <section class="categories container">
        <ul class="categories_list d-flex align-items-center justify-content-center gap-4 p-0 mb-0">
            <li
                v-for="(category, index) in 6"
                :key="index"
                class="categories_list__item"
            >
                <router-link class="categories_list__item-link text-decoration-none" to="/">
                    index
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "CategoryFilter"
}
</script>


<style scoped lang="scss">
.categories {
    margin-top: 64px;

    &_list {
        list-style: none;

        &__item {
            padding: 8px 16px;
            border-radius: 30px;
            background-color: mediumpurple;

            &-link {
                font-size: 12px;
                line-height: 16px;
            }
        }
    }
}
</style>