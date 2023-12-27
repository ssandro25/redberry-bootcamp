<template>
    <div
        v-for="blog in filteredBlogs"
        :key="blog.id"
        class="col"
        :id="blog.id"
    >
        <div class="blog_item">
            <div class="blog_item__pic">
                <img
                    :src="blog.image"
                    class="w-100"
                    alt=""
                >
            </div>

            <p class="blog_item__author mt-4 mb-0">
                {{ blog.author }}
            </p>

            <span class="blog_item__date d-block mt-2">
                {{ formatDate(blog.publish_date ) }}
            </span>

            <div class="blog_item__title mt-3 mb-0">
                {{ blog.title }}
            </div>

            <ul class="blog_item_categories__list d-flex flex-wrap align-items-center gap-3 p-0 mt-3 mb-0">
                <li
                    v-for="category in blog.categories"
                    :key="category.id"
                    class="blog_item_categories__list--item"
                    :style="`background-color: ${category.background_color}; color: ${category.text_color}`"
                >
                    {{ category.title }}
                </li>
            </ul>

            <p class="blog_item__description mt-2 mb-0">
                {{ blog.description }}
            </p>

            <router-link
                :to="/blogs/+blog.id"
                class="view_blog__link d-block text-decoration-none mt-3"
            >
                სრულიად ნახვა
                <img :src="ArrowIcon" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
import ArrowIcon from "@/assets/images/arrow-icon.svg"
import moment from 'moment';
import { mapGetters } from "vuex";

export default {
    name: "BlogItem",

    props: {
        blogs: Array
    },

    data() {
        return {
            ArrowIcon
        }
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },
    },

    computed: {
        ...mapGetters([
            'getChosenCategory'
        ]),

        // filteredBlogs() {
        //     const today = moment();
        //
        //     console.log(today._d)
        //
        //
        //     return this.blogs.filter(blog => {
        //         const showBlogDate = moment(blog.publish_date);
        //
        //         return showBlogDate.isSameOrBefore(today, 'day');
        //     });
        // },

        filteredBlogs() {
            const today = moment();
            const chosenCategoryIds = this.getChosenCategory.map(category => category.id);

            return this.blogs.filter(blog => {
                const showBlogDate = moment(blog.publish_date);

                const isCategorySelected = blog.categories.some(category => chosenCategoryIds.includes(category.id));

                return showBlogDate.isSameOrBefore(today, 'day') && (chosenCategoryIds.length === 0 || isCategorySelected);
            });
        },
    },
}
</script>


<style scoped lang="scss">
.blog_item {
    &:hover &__pic img {
        transform: scale(1.2);
    }

    &__pic {
        overflow: hidden;
        border-radius: 12px;
        height: 328px;
        img {
            border-radius: 12px;
            height: 328px;
            object-fit: cover;
            transition: .8s;
        }
    }

    &__author {
        color: #1A1A1F;
        line-height: 20px;
    }

    &__date {
        color: #85858D;
        line-height: 16px;
        font-size: 12px;
    }

    &__title {
        line-height: 28px;
        font-size: 20px;
        font-weight: 700;
        color: #1A1A1F;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 56px;
    }

    &_categories__list {
        list-style: none;
        &--item {
            border-radius: 30px;
            padding: 6px 10px;
            font-size: 12px;
            line-height: 16px;
        }
    }

    &__description {
        font-weight: 400;
        color: #404049;
        line-height: 28px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .view_blog__link {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        color: #5D37F3;

        &:hover {
            opacity: .8;
            text-decoration: underline !important;
        }
    }
}
</style>