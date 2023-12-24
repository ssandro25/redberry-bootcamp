<template>
    <div class="modal fade" id="authorizationModal" tabindex="-1" aria-labelledby="authorizationModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body pt-0">
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

                            <p
                                v-if="!emailCheckMessage"
                                class="email_not_found__text mt-2 mb-0">
                                <img :src="InfoIcon" alt=""> ელ-ფოსტა არ მოიძებნა
                            </p>
                        </div>

                        <button
                            class="btn btn-primary w-100 mt-4"
                            @click="login()"
                        >
                            შესვლა
                        </button>
                    </div>

                    <div
                        v-else
                        class="text-center">
                        <img :src="SuccessCheckIcon" alt="">

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
            InfoIcon
        }
    },

    methods: {
        login() {
            api.login(this.email).then(response => {
                console.log(response)
                if (response && response.status === 204) {
                    this.authorized = true;
                    this.$store.dispatch('setAuthorized', this.authorized)

                }
            }).catch(error => {
                if (error.response && error.response.status === 422) {
                    this.emailCheckMessage = false;
                }
            });
        },

        refreshRoute() {
            location.reload()
        }
    },
}
</script>

<style scoped lang="scss">
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
    color: #EA1919;
}

.email_not_found__input {
    border: 1px solid #EA1919 !important;
    background: #FAF2F3 !important;
}
</style>