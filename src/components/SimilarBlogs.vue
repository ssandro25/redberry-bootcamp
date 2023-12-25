<template>
    <div>
        <h2 class="similar_blogs__title">
            მსგავსი სტატიები
        </h2>

        <swiper
            :slides-per-view="3"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide
                v-for="blog in similarBlogs"
                :key="blog.id"
                :id="blog.id">
                <div>
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
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import ArrowIcon from "@/assets/images/arrow-icon.svg"
import {Swiper, SwiperSlide} from 'swiper/vue';
import moment from 'moment';

export default {
    name: "SimilarBlogs",

    props: {
        similarBlogs: Array
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    data() {
        return {
            ArrowIcon
        }
    },

    methods: {
        onSwiper(swiper) {
            console.log(swiper);
        },

        onSlideChange() {
            console.log('slide change');
        },

        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },
    }
}
</script>


<style scoped lang="scss">
.similar_blogs__title {
    margin-top: 98px;
    margin-bottom: 40px;
    color: #1A1A1F;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
}
.blog_item {
    &__pic img {
        border-radius: 12px;
        height: 328px;
        object-fit: cover;
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
    }
}
</style>