<template>
    <section class="categories container">
        <ul class="categories_list d-flex align-items-center gap-4 p-0 mb-0">
            <li
                v-for="category in categories"
                :key="category.id"
                class="categories_list__item text-nowrap"
                :style="`background-color: ${category.background_color};`"
            >
                <router-link
                    class="categories_list__item-link text-decoration-none" to="/"
                    :style="`color: ${category.text_color}`"
                >
                    {{ category.title }}
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import Api from "@/requests/Request"

const api = new Api()
export default {
    name: "CategoryFilter",

    data() {
        return {
            categories: []
        }
    },

    mounted() {
        api.getCategories().then(response => {
            if (response.data) {
                this.categories = response.data.data
            }
        })
    }
}
</script>


<style scoped lang="scss">
.categories {
    margin-top: 64px;

    &_list {
        overflow-x: auto;
        list-style: none;

        &__item {
            padding: 8px 16px;
            border-radius: 30px;

            &-link {
                font-size: 12px;
                line-height: 16px;
            }
        }
    }
}
</style>