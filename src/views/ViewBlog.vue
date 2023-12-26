<template>
    <div class="blog__page container">
        <router-link
            to="/"
            class="home__btn_arrow d-flex align-items-center justify-content-center rounded-circle position-fixed"
        >
<!--            <img :src="ArrowIcon" alt="">-->

            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z" fill="#1A1A1F"/>
            </svg>
        </router-link>

        <div class="blog__page__container_wrap mx-auto">
             <div class="blog">
                 <div class="blog__image">
                     <img
                         :src="currentBlog.image"
                         class="w-100"
                         alt=""
                     >
                 </div>

                 <p class="blog__author mb-0">
                     {{ currentBlog.author }}
                 </p>

                 <p class="d-flex align-items-center gap-2 mt-2 mb-0">
                    <span class="blog__date">
                        {{ formatDate(currentBlog.publish_date ) }}
                    </span>

                     <span v-if="currentBlog.email" class="blog__email fw-bold">
                          &bull;
                     </span>

                     <span v-if="currentBlog.email" class="blog__email">
                         {{ currentBlog.email }}
                     </span>
                 </p>

                 <h1 class="blog__title mt-4 mb-0">
                     {{ currentBlog.title }}
                 </h1>

                 <ul class="blog__categories d-flex align-items-center gap-3 p-0 mt-4 mb-0">
                     <li
                         v-for="category in currentBlog.categories"
                         :key="category.id"
                         class="blog__categories--item"
                         :style="`background-color: ${category.background_color}; color: ${category.text_color}`"
                     >
                         {{ category.title }}
                     </li>
                 </ul>

                 <p class="blog__description mb-0">
                    {{ currentBlog.description }}
                 </p>
             </div>
        </div>

        <SimilarBlogs :similar-blogs="similarBlogs"/>

    </div>
</template>

<script>
import ArrowIcon from "@/assets/images/arrow.svg"
import moment from 'moment';
import Api from "@/requests/Request"
import SimilarBlogs from "@/components/SimilarBlogs.vue";

const api = new Api()
export default {
    name: "ViewBlog",

    components: {
        SimilarBlogs
    },

    data() {
        return {
            currentBlog: [],
            similarBlogs: [],
            ArrowIcon
        }
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        },

        viewBlog(id) {
            api.viewBlog(id).then(response => {
                this.currentBlog = response.data
            })
        }
    },

    watch: {
        '$route'(e) {
            this.viewBlog(e.params.id)
        }
    },

    mounted() {
        // api.viewBlog(this.$route.params.id).then(response => {
        //     this.currentBlog = response.data
        // })

        this.viewBlog(this.$route.params.id)

        api.getBlogs().then(response => {
            this.similarBlogs = response.data.data.filter(blog => {
                return (
                    blog.id !== this.currentBlog.id &&
                    blog.categories.some(category => {
                        return this.currentBlog.categories.some(
                            currentCategory => currentCategory.title === category.title
                        );
                    })
                );
            });
        });
    }
}
</script>


<style scoped lang="scss">
.blog__page {
    padding-bottom: 65px;

    &__container_wrap {
        max-width: 720px;
        margin-top: 40px;

        .blog {
            &__image img{
                height: 328px;
                object-fit: cover;
                border-radius: 12px;
            }

            &__author {
                color: #1A1A1F;
                font-size: 16px;
                font-weight: 500;
                line-height: 20px;
                margin-top: 40px;
            }

            &__date, &__email {
                color: #85858D;
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
            }

            &__title {
                color: #1A1A1F;
                font-size: 32px;
                font-weight: 700;
                line-height: 40px;
            }

            &__categories {
                list-style: none;
                &--item {
                    border-radius: 30px;
                    padding: 6px 10px;
                    font-size: 12px;
                    line-height: 16px;
                }
            }

            &__description {
                color: #404049;
                font-size: 16px;
                font-weight: 400;
                line-height: 28px;
                margin-top: 40px;
            }
        }
    }
}

</style>