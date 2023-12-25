<template>
    <SuccessAdded v-if="addedSuccess" />

    <div class="container-fluid__add_blog pb-65">
        <div class="container">

            <router-link
                to="/"
                class="home__btn_arrow d-flex align-items-center justify-content-center rounded-circle position-fixed"
            >
                <img :src="ArrowIcon" alt="">
            </router-link>

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

                            <div
                                v-if="!file"
                                class="add__file__container text-center p-5 mt-2 position-relative"
                            >
                                <img :src="AddFileIcon" alt="Add file icon">

                                <p class="add__file__container--label mt-4 mb-0">
                                    ჩააგდეთ ფაილი აქ ან
                                    <span
                                        class="text-decoration-underline cursor-pointer"
                                    >
                                        აირჩიეთ ფაილი
                                    </span>
                                </p>

                                <input
                                    @change="addFile"
                                    id="choose__file_input"
                                    class="opacity-0 choose__file_input position-absolute"
                                    type="file"
                                >
                            </div>

                            <div v-else class="added__file d-flex align-items-center justify-content-between p-3 mt-2">
                                <div class="d-flex align-items-center gap-2 text-truncate">
                                    <img :src="GalleryIcon" alt="">

                                    <span :title="fileName" class="added__file_name text-truncate">
                                        {{ fileName }}
                                    </span>
                                </div>

                                <button
                                    title="ფოტოს წაშლა"
                                    type="button"
                                    class="btn p-0 border-0"
                                    @click="removeChosenFile()"
                                >
                                    <img :src="CloseIcon" alt="">
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mt-4" >
                        <div class="d-flex flex-column">
                            <label for="author" class="label">
                                ავტორი *
                            </label>

                            <input
                                v-model="author"
                                id="author"
                                type="text"
                                class="form-control mt-2"
                                :class="{
                                    'valid__input': getNonSpaceLength(author) >= 4 &&  wordCount >= 2 &&  isGeorgianCharacters,
                                    'not_valid__input' :getNonSpaceLength(author) < 4 && author.trim().length !== 0 || wordCount < 2  && author.length !== 0 || !isGeorgianCharacters && author.length !== 0
                                }"
                                placeholder="შეიყვანეთ ავტორი"
                                @input="validGeorgianCharacters"
                            >

                            <ul class="validation d-flex flex-column gap-1 ps-4 mt-2 mb-0">
                                <li :class="['validation__property', {
                                    'is__valid' : getNonSpaceLength(author) >= 4,
                                    'is_not__valid' : getNonSpaceLength(author) < 4 && author.trim().length !== 0
                                }]">
                                    მინიმუმ 4 სიმბოლო
                                </li>

                                <li :class="['validation__property', {
                                    'is__valid' : wordCount >= 2,
                                    'is_not__valid' : wordCount < 2 && author.trim().length !== 0
                                  }]">
                                    მინიმუმ ორი სიტყვა
                                </li>

                                <li :class="['validation__property', {
                                    'is__valid' : isGeorgianCharacters,
                                    'is_not__valid' : !isGeorgianCharacters && author.trim().length !== 0
                                  }]">
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
                                :class="{
                                    'valid__input': getNonSpaceLength(title) >= 4,
                                    'not_valid__input' : getNonSpaceLength(title) < 4 && title.trim().length !== 0
                                }"
                                placeholder="შეიყვანეთ სათაური"
                                @input="validateTitle"
                            >

                            <span :class="['validation__property mt-2', {
                                  'is__valid' : getNonSpaceLength(title) >= 4,
                                  'is_not__valid' : getNonSpaceLength(title) < 4 && title.trim().length !== 0
                                }]">
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
                                :class="{
                                    'valid__input': getNonSpaceLength(description) >= 4,
                                    'not_valid__input' : getNonSpaceLength(description) < 4 && description.trim().length !== 0
                                }"
                                placeholder="შეიყვანეთ აღწერა"
                                rows="5"
                            ></textarea>

                            <span :class="['validation__property mt-2', {
                                'is__valid' : getNonSpaceLength(description) >= 4,
                                'is_not__valid' : getNonSpaceLength(description) < 4 && description.trim().length !== 0
                            }]">
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
                                :class="{
                                    'valid__input': date,
                                }"
                                placeholder="შეიყვანეთ თარიღი "
                            >
                        </div>
                    </div>

                    <div class="col-6 mt-4">
                        <div class="d-flex flex-column">
                            <label class="label">
                                კატეგორია *
                            </label>

                            <Multiselect
                                @change="selectCategory"
                                :hideSelected="false"
                                :canClear="false"
                                :closeOnSelect="false"
                                noResultsText="ცარიელია."
                                wra
                                mode="tags"
                                v-model="categories"
                                :options="options"
                                placeholder="აირჩიეთ კატეგორია"
                                class="mt-2"
                                :class="{ 'valid__input': categories.length > 0 }"
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
                            <label for="email" class="label">
                                ელ-ფოსტა
                            </label>

                            <input
                                v-model="email"
                                id="email"
                                type="email"
                                class="form-control mt-2"
                                :class="{
                                    'valid__input': isEmailValid && email.length !== 0,
                                    'not_valid__input' : !isEmailValid && email.length !== 0
                                }"
                                placeholder="Example@redberry.ge"
                                @input="validateEmail"
                            >

                            <div
                                v-if="!isEmailValid"
                                  class="email_validation__property d-flex align-items-start gap-2 mt-2"
                                  :class="{
                                    'd-none' : isEmailValid || !email.length
                                  }"
                            >
                                <img :src="InfoIcon" alt="">

                                <span>
                                    მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 ms-auto">
                        <button
                            :disabled="!isDisabled"
                            class="btn btn-primary w-100 publish_blog__btn"
                            @click="postBlog()"
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
import ArrowIcon from "@/assets/images/arrow.svg"
import Multiselect from '@vueform/multiselect'
import AddFileIcon from '@/assets/images/folder-add.svg'
import GalleryIcon from '@/assets/images/gallery-icon.svg'
import CloseIcon from '@/assets/images/close-icon.svg'
import InfoIcon from '@/assets/images/info-circle.svg'
import SuccessAdded from "@/components/SuccessAdded.vue";
import Api from "@/requests/Request"

const api = new Api()
export default {
    name: "AddBlog",

    components: {
        SuccessAdded,
        Multiselect,
    },

    data() {
        return {
            author: '',
            title: '',
            description: '',
            date: null,
            email: '',
            categories: [],
            options: [],
            file: null,
            fileName: null,
            isGeorgianCharacters: false,
            isEmailValid: true,
            addedSuccess: false,
            AddFileIcon,
            GalleryIcon,
            CloseIcon,
            InfoIcon,
            ArrowIcon
        }
    },

    methods: {
        // chooseFile() {
        //     document.querySelector('#choose__file_input').click()
        // },

        addFile(event){
            this.file = event.target.files;

            this.fileName = this.file[0].name;

            console.log(this.file, 'file')
            console.log(typeof this.file[0].name, 'file name')
        },

        removeChosenFile() {
            this.file = null
        },

        validGeorgianCharacters() {
            const georgianRegex = /^[\u10A0-\u10FF\s]+$/;

            this.isGeorgianCharacters = georgianRegex.test(this.author.trim());
        },

        validateEmail() {
            const emailRegex = /@redberry\.ge$/;
            this.isEmailValid = emailRegex.test(this.email);
        },

        validateTitle() {
            this.$emit('input', this.title.trim());
        },

        getNonSpaceLength(str) {
            return str.replace(/\s/g, '').length;
        },

        selectCategory(selectedIndexes) {
            if (selectedIndexes.length > 0 && this.options.length > 0) {
                selectedIndexes.filter(index => index >= 0 && index < this.options.length).map(index => this.options[index]?.title);

                this.categories = selectedIndexes;
            }
        },

        postBlog() {
            api.postBlog(this.title, this.description, this.file, this.author, this.date, JSON.stringify(this.categories), this.email).then(() => {
                this.addedSuccess = true
            })
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


    },

    computed: {
        wordCount() {
            const words = this.author.trim().split(/\s+/);
            return words.length;
        },

        isDisabled() {
            return this.file
                && this.getNonSpaceLength(this.author) >= 4
                && this.wordCount >= 2
                && this.isGeorgianCharacters
                && this.getNonSpaceLength(this.title) >= 4
                && this.getNonSpaceLength(this.description) >= 4
                && this.date
                && this.categories.length > 0
                && (this.isEmailValid || this.email === '')
        }
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.valid__input {
    border-color: #14D81C !important;
}
.not_valid__input {
    border: 1px solid #EA1919 !important;
    background: #FAF2F3 !important;
}
.is__valid {
    color: #14D81C !important;
}
.is_not__valid {
    color: #EA1919 !important;
}
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

    .choose__file_input {
        width: 600px;
        height: 182px;
        top: 0;
        left: 0;
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

.multiselect-placeholder,
input::placeholder {
    color: #85858D !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 20px !important;
}
.validation {
    &__property {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #85858D;
    }
}
.email_validation__property {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #EA1919;
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
.publish_blog__btn:disabled {
    background-color: #E4E3EB !important;
    border-color: #E4E3EB !important;
    opacity: 1 !important;
}
@media (min-width: 1400px) {
    .container__wrap {
        max-width: 600px;
    }
}
</style>