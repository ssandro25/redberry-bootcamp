<template>
    <div
        v-for="(blog, index) in 6"
        :key="index"
        class="col"
    >
        <div class="blog_item">
            <div class="blog_item__pic">
                <img
                    src="@/assets/images/blog-pic.png"
                    class="w-100"
                    alt="">
            </div>

            <p class="blog_item__author mt-4 mb-0">
                ლილე კვარაცხელია
            </p>

            <span class="blog_item__date d-block mt-2">
                02.11.2023
            </span>

            <div class="blog_item__title mt-3 mb-0">
                მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია. მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა
            </div>

            <ul class="blog_item_categories__list d-flex align-items-center gap-3 p-0 mt-3 mb-0">
                <li
                    v-for="(category, index) in 3"
                    :key="index"
                    class="blog_item_categories__list--item">
                    Figma
                </li>
            </ul>

            <p class="blog_item__description mt-2 mb-0">
                6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის. 6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის. 6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის
            </p>

            <router-link
                to="/"
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
export default {
    name: "BlogItem",

    data() {
        return {
            ArrowIcon
        }
    }
}
</script>


<style scoped lang="scss">
.blog_item {
    &__pic img {
        border-radius: 12px;
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
    }

    &_categories__list {
        list-style: none;
        &--item {
            border-radius: 30px;
            padding: 6px 10px;
            font-size: 12px;
            line-height: 16px;
            background-color: #08D2AE14;
            color: #1AC7A8;
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