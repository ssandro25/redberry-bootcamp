<template>
    <div class="blog__page container">

        <MainPageButton/>

        <VLoader v-if="loading" />

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

                 <ul class="blog__categories d-flex flex-wrap align-items-center gap-3 p-0 mt-4 mb-0">
                     <li
                         v-for="category in currentBlog.categories"
                         :key="category.id"
                         class="blog__categories--item text-nowrap"
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
import MainPageButton from "@/components/MainPageButton.vue";
import VLoader from "@/components/Loader.vue";

const api = new Api()
export default {
    name: "ViewBlog",

    components: {
        VLoader,
        MainPageButton,
        SimilarBlogs
    },

    data() {
        return {
            currentBlog: [],
            similarBlogs: [],
            ArrowIcon,
            loading: false
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
        this.loading = true;

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

            this.loading = false;
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
                white-space: pre-wrap;
            }
        }
    }
}

</style>