<template>
    <section class="blogs container">
        <div class="blogs_list row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-5">
            <BlogItem :blogs="blogs"/>
        </div>
    </section>
</template>

<script>
import BlogItem from "@/components/BlogItem.vue";

import Api from "@/requests/Request"

const api = new Api()

export default {
    name: "BlogsList",

    components: {
        BlogItem
    },

    data() {
        return {
            blogs: [],
        }
    },

    mounted() {
        api.getBlogs().then(response => {
            this.blogs = response.data.data
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
</style>