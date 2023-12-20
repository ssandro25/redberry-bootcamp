<template>
    <div class="container">
        <h1 class="add_blog__title">
            ბლოგის დამატება
        </h1>

        <div>
            <input type="file">
        </div>
    </div>

</template>

<script>
export default {
    name: "AddBlog"
}
</script>

<style scoped lang="scss">
.add_blog__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    margin-top: 40px;
}

@media (min-width: 1400px) {
    .container {
        max-width: 600px;
    }
}
</style>