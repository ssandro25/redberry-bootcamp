<template>
    <div
        class="modal fade"
        id="authorizationModal"
        tabindex="-1"
        aria-labelledby="authorizationModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header border-0 p-0">
                    <button
                        v-if="!authorized"
                        type="button"
                        class="close__btn"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <img :src="CloseIcon" alt="">
                    </button>

                    <button
                        v-else
                        type="button"
                        class="close__btn"
                        @click="refreshRoute()"
                    >
                        <img :src="CloseIcon" alt="">
                    </button>
                </div>

                <div class="modal-body">
                    <div v-if="!authorized">
                        <p class="modal__title text-center mb-0">
                            შესვლა
                        </p>

                        <div class="d-flex flex-column mt-3">
                            <label class="label" for="email">
                                ელ-ფოსტა
                            </label>

                            <input
                                v-model="email"
                                type="email"
                                class="form-control mt-2"
                                :class="{
                                    'email_not_found__input' : !emailCheckMessage
                                }"
                                placeholder="Example@redberry.ge"
                                id="email"
                            >

                            <p class="email_not_found__text mt-2 mb-0">
                                <span  v-if="!emailCheckMessage">
                                     <img :src="InfoIcon" alt=""> ელ-ფოსტა არ მოიძებნა
                                </span>

                            </p>
                        </div>

                        <button
                            :disabled="!email"
                            class="btn btn-primary w-100 mt-4"
                            @click="login()"
                        >
                            შესვლა
                        </button>
                    </div>

                    <div
                        v-else
                        class="text-center"
                    >
                        <div class="success__icon">
                            <img :src="SuccessCheckIcon" alt="">
                        </div>

                        <p class="success_login__text mt-3 mb-0">
                            წარმატებული ავტორიზაცია
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary w-100 mt-5"
                            @click="refreshRoute()"
                        >
                            კარგი
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from '@/assets/images/close.svg'
import SuccessCheckIcon from '@/assets/images/tick-circle.svg'
import InfoIcon from '@/assets/images/info-circle.svg'
import Api from "@/requests/Request"

const api = new Api()
export default {
    name: "AuthorizationModal",

    data() {
        return {
            email: null,
            authorized: false,
            emailCheckMessage: true,
            SuccessCheckIcon,
            InfoIcon,
            CloseIcon
        }
    },

    methods: {
        login() {
            api.login(this.email).then(response => {
                if (response && response.status === 204) {
                    this.authorized = true;
                    localStorage.setItem('authorized', this.authorized.toString())
                    // this.$store.dispatch('setAuthorized', this.authorized)

                }
            }).catch(error => {
                if (error.response && error.response.status === 422) {
                    this.emailCheckMessage = false;
                }
            });
        },

        refreshRoute() {
            // location.reload()
            location.href = "/"
        }
    },
}
</script>

<style lang="scss">
.modal__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: #1A1A1F;
}

.label {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}

.success_login__text {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
}

.email_not_found__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    height: 21px;
    color: #EA1919;
}

.email_not_found__input {
    border: 1px solid #EA1919 !important;
    background: #FAF2F3 !important;
}

.modal-header {
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 20px;
}

.modal-body {
    padding: 64px 24px 40px !important;
}
.modal-backdrop {
    background-color: rgba(26, 26, 31, 1) !important;
    opacity: 0.24 !important;
}
.modal-content {
    border-radius: 12px !important;
}
.close__btn {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 0;

    img {
        padding: 8px;
        border-radius: 50%;
        transition: .3s;
    }

    &:hover img {
        background-color: #F5F4F9;
    }
}
.success__icon {
    height: 64px;
}
</style>