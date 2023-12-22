<template>
    <SuccessAddedModal/>

    <div class="container">
        <div class="container__wrap mx-auto">
            <h1 class="add_blog__title">
                ბლოგის დამატება
            </h1>

            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <label for="" class="label">
                            ატვირთეთ ფოტო
                        </label>

                        <input
                            type="file"
                            class="mt-2"
                        >
                    </div>
                </div>

                <div class="col-md-6 mt-4">
                    <div class="d-flex flex-column">
                        <label for="author" class="label">
                            ავტორი *
                        </label>

                        <input
                            v-model="author"
                            id="author"
                            type="text"
                            class="form-control mt-2"
                            placeholder="შეიყვანეთ ავტორი"
                        >

                        <ul class="validation d-flex flex-column gap-1 ps-4 mt-2 mb-0">
                            <li class="validation__property">
                                მინიმუმ 4 სიმბოლო
                            </li>

                            <li class="validation__property">
                                მინიმუმ ორი სიტყვა
                            </li>

                            <li class="validation__property">
                                მხოლოდ ქართული სიმბოლოები
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-6 mt-4">
                    <div class="d-flex flex-column">
                        <label for="title" class="label">
                            სათაური *
                        </label>

                        <input
                            v-model="title"
                            id="title"
                            type="text"
                            class="form-control mt-2"
                            placeholder="შეიყვანეთ სათაური"
                        >

                        <span class="validation__property mt-2">
                        მინიმუმ 4 სიმბოლო
                    </span>
                    </div>
                </div>

                <div class="col-12 mt-4">
                    <div class="d-flex flex-column">
                        <label for="description" class="label">
                            აღწერა *
                        </label>

                        <textarea
                            v-model="description"
                            id="description"
                            class="form-control mt-2"
                            placeholder="შეიყვანეთ აღწერა"
                            rows="5"
                        ></textarea>

                        <span class="validation__property mt-2">
                        მინიმუმ 4 სიმბოლო
                    </span>
                    </div>
                </div>

                <div class="col-6 mt-4">
                    <div class="d-flex flex-column">
                        <label for="date" class="label">
                            გამოქვეყნების თარიღი *
                        </label>

                        <input
                            v-model="date"
                            id="date"
                            type="date"
                            class="form-control mt-2"
                            placeholder="შეიყვანეთ თარიღი "
                        >
                    </div>
                </div>

                <div class="col-6 mt-4">
                    <div class="d-flex flex-column">
                        <label for="date" class="label" :color="color">
                            კატეგორია *
                        </label>

                        <Multiselect
                            mode="tags"
                            v-model="categories"
                            :options="options"
                            groupOptions="options"
                            class="mt-2"
                            placeholder="აირჩიეთ კატეგორია"
                        />
                    </div>
                </div>

                <div class="col-6 mt-4">
                    <div class="d-flex flex-column">
                        <label for="date" class="label">
                            ელ-ფოსტა
                        </label>

                        <input
                            v-model="email"
                            id="email"
                            type="email"
                            class="form-control mt-2"
                            placeholder="Example@redberry.ge"
                        >
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6 ms-auto">
                    <button
                        class="btn btn-primary w-100 publish_blog__btn"
                        data-bs-toggle="modal"
                        data-bs-target="#publishBlogModal"
                    >
                        გამოქვეყნება
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import Multiselect from '@vueform/multiselect'

import Api from "@/requests/Request"
import SuccessAddedModal from "@/components/SuccessAddedModal.vue";

const api = new Api()
export default {
    name: "AddBlog",

    components: {
        SuccessAddedModal,
        Multiselect,
    },

    data() {
        return {
            author: null,
            title: null,
            description: null,
            date: null,
            email: null,
            categories: null,
            options: [],
            color: ''
        }
    },

    mounted() {
        api.getCategories().then(response => {
            if(response.data.data) {
                this.options = response.data.data.map(option => option.title);

                this.color = response.data.data.map(option => option.background_color);
            }
        })
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">

//:root {
//    --ms-tag-bg: attr(color);
//    --ms-tag-color: #D1FAE5;
//}

.add_blog__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    margin: 40px 0;
}

.label {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}

.validation {
    &__property {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #85858D;
    }
}

.multiselect {
    border-radius: 12px;
    border-color: #E4E3EB;
    background-color: #FCFCFD;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    min-height: 46px;
}
.multiselect.is-active {
    border-color: #5D37F3;
    border-radius: 12px;
    box-shadow: unset;
}
.multiselect-tags {
    padding: 6px;
    margin: 0;
    gap: 8px;
}

.multiselect-tag {
    margin: 0;
    padding: 8px 12px;
    border-radius: 30px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
}
.multiselect-tag-remove {
    padding: 0;
    margin-left: 8px;
}
.publish_blog__btn {
    margin-top: 40px;
}
@media (min-width: 1400px) {
    .container__wrap {
        max-width: 600px;
    }
}
</style>