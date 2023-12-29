<template>
    <section class="categories container">
        <ul class="categories_list d-flex align-items-center gap-4 p-0 mb-0">
            <li
                v-for="category in categories"
                :key="category.id"
                class="categories_list__item text-nowrap"
                :title="category.title"
            >
                <button
                    type="button"
                    class="btn border-0 categories_list__item-btn text-decoration-none"
                    :style="{ color: category.text_color,  backgroundColor: category.background_color, outline: isCategorySelected(category.id) ? '1px solid #000' : 'none' }"
                    @click="pushCategory(category.id)"
                >
                    {{ category.title }}
                </button>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "@/requests/Request"

const api = new Api()
export default {
    name: "CategoryFilter",

    data() {
        return {
            categories: []
        }
    },

    methods: {
        pushCategory(categoryId) {
            const isCategoryAlreadySelected = this.isCategorySelected(categoryId);

            if (isCategoryAlreadySelected) {
                this.removeCategory(categoryId);
            } else {
                this.addCategory(categoryId);
            }
        },

        addCategory(categoryId) {
            this.$store.dispatch('setChosenCategory', categoryId);
        },

        removeCategory(categoryId) {
            this.$store.dispatch('removeChosenCategory', categoryId);
        },

        isCategorySelected(categoryId) {
            return this.getChosenCategory.some(category => category.id === categoryId);
        }
    },

    mounted() {
        api.getCategories().then(response => {
            if (response.data) {
                this.categories = response.data.data
            }
        })
    },

    computed: {
        ...mapGetters([
            'getChosenCategory'
        ])
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
            padding: 1px;

            &-btn {
                border-radius: 30px !important;
                padding: 8px 16px;
                font-size: 12px;
                line-height: 16px;
            }
        }
    }
}
</style>