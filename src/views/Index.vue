<template>
    <div class="container-fluid pb-65">
        <IntroCover />

        <CategoryFilter />

        <BlogsList />
    </div>
</template>

<script>
import IntroCover from "@/components/IntroCover.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";
import BlogsList from "@/components/BlogsList.vue";

export default {
    name: 'v-index',

    components: {
        BlogsList,
        CategoryFilter,
        IntroCover
    },
}
</script>
