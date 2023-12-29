<template>
    <section class="blogs container">
        <div class="blogs_list row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-5">
            <VLoader v-if="loading" />

            <div v-else>
                <p v-if="!blogs.length" class="not_found__text mb-0">
                    თქვენ არ გაქვთ დამატებული ბლოგები...
                </p>

                <BlogItem v-else :blogs="blogs"/>
            </div>

        </div>
    </section>
</template>

<script>
import BlogItem from "@/components/BlogItem.vue";

import Api from "@/requests/Request"
import VLoader from "@/components/Loader.vue";

const api = new Api()

export default {
    name: "BlogsList",

    components: {
        VLoader,
        BlogItem
    },

    data() {
        return {
            blogs: [],
            loading: false
        }
    },

    mounted() {
        this.loading = true;

        api.getBlogs().then(response => {
            this.blogs = response.data.data
            this.loading = false;
        })

    }
}
</script>

<style scoped lang="scss">
.blogs {
    margin-top: 64px;
}

.gy-5 {
    --bs-gutter-y: 56px;
}

.not_found__text {
    color: #404049;
    font-size: 18px;
}

</style>