<template>
    <SuccessAddedModal/>
    <div class="container-fluid__add_blog">
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

                            <div v-if="!file" class="add__file__container text-center p-5 mt-2">
                                <img :src="AddFileIcon" alt="Add file icon">

                                <p class="add__file__container--label mt-4 mb-0">
                                    ჩააგდეთ ფაილი აქ ან
                                    <span
                                        class="text-decoration-underline"
                                        @click="chooseFile()"
                                    >
                                        აირჩიეთ ფაილი
                                    </span>
                                </p>

                                <input
                                    @change="addFile"
                                    id="choose__file_input"
                                    class="d-none"
                                    type="file"
                                >
                            </div>

                            <div v-else class="added__file d-flex align-items-center justify-content-between p-3 mt-2">
                                <div class="d-flex align-items-center gap-2">
                                    <img :src="GalleryIcon" alt="">

                                    <span class="added__file_name">
                                        {{ fileName }}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    class="btn p-0 border-0"
                                    @click="removeChosenFile()"
                                >
                                    <img :src="CloseIcon" alt="">
                                </button>
                            </div>
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
                            <label for="date" class="label">
                                კატეგორია *
                            </label>

                            <Multiselect
                                :canClear="false"
                                :closeOnSelect="false"
                                wra
                                mode="tags"
                                v-model="categories"
                                :options="options"
                                placeholder="აირჩიეთ კატეგორია"
                                class="mt-2"
                                label="title"
                            >

                                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                    <div
                                        :style="`background-color: ${option.background_color}; color: ${option.text_color}`"
                                        class="multiselect-tag is-user"
                                        :class="{ 'is-disabled': disabled }">

                                        {{ option.title }}
                                        <div
                                            v-if="!disabled"
                                            class="multiselect-tag-remove"
                                            @mousedown.prevent="handleTagRemove(option, $event)"
                                        >
                                          <span class="multiselect-tag-remove-icon">
                                              {{ option.title }}
                                          </span>
                                        </div>
                                    </div>
                                </template>

                                <template v-slot:option="{ option }">
                                    <div
                                        class="multiselect-option__item"
                                        :style="`background-color: ${option.background_color}; color: ${option.text_color}`">
                                        {{ option.title }}
                                    </div>
                                </template>
                            </Multiselect>
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
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import AddFileIcon from '@/assets/images/folder-add.svg'
import GalleryIcon from '@/assets/images/gallery-icon.svg'
import CloseIcon from '@/assets/images/close-icon.svg'

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
            file: null,
            fileName: null,
            AddFileIcon,
            GalleryIcon,
            CloseIcon
        }
    },

    methods: {
        chooseFile() {
            document.querySelector('#choose__file_input').click()
        },

        addFile(event){
            this.file = event.target.files;

            this.fileName = this.file[0].name;

            console.log(this.file, 'file')
            console.log(typeof this.file[0].name, 'file name')
        },

        removeChosenFile() {
            this.file = null
        }
    },

    mounted() {
        api.getCategories().then(response => {
            if(response.data) {
                this.options = response.data.data;

                this.options = this.options.map((obj) => {
                    return { ...obj, value: obj.id };
                });

                // console.log(response.data.data, 'response data.data')
                // console.log(this.options, 'this.options')
            }
        })

        console.log(this.file, 'file')
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.container-fluid__add_blog {
    background-color: #FBFAFF;
}

.added__file {
    background-color: rgba(242, 242, 250, 1);
    border-radius: 12px;

    &_name {
        color: #1A1A1F;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }
}
.add__file__container {
    background-color: #F4F3FF;
    border: 1px dashed #85858D;
    border-radius: 12px;

    &--label {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #1A1A1F;

        span {
            font-weight: 500;
        }
    }
}

.add_blog__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    padding: 40px 0;
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
    flex-wrap: nowrap;
    overflow: hidden;
    margin-right: 5px;
}

.multiselect-tag {
    margin: 0;
    padding: 8px 12px;
    border-radius: 30px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    min-width: unset;
}
.multiselect-tag-remove {
    padding: 0;
    margin-left: 8px;
}
.multiselect-dropdown {
    border-radius: 12px;
    border: 1px solid #E4E3EB;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.08);
    bottom: -4px;
    padding: 16px;
}
.multiselect-options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
}
.multiselect-option {
    display: inline;
    padding: 0;
    background: unset !important;
}
.multiselect-option:hover {
    background: unset !important;
}
.multiselect-option__item {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 30px;
}
.multiselect-caret {
    mask-image: url("@/assets/images/arrow-down.svg");
    background-color: #1A1A1F;
    width: 15px;
    height: 15px;
    margin-right: 10px;
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