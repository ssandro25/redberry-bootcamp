<template>
    <div class="modal fade" id="authorizationModal" tabindex="-1" aria-labelledby="authorizationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body pt-0">
                    <p class="modal__title text-center mb-0">
                        შესვლა
                    </p>

                    <div class="d-flex flex-column mt-3">
                        <label class="label" for="mail">
                            ელ-ფოსტა
                        </label>

                        <input
                            v-model="mail"
                            type="email"
                            class="form-control mt-2"
                            placeholder="Example@redberry.ge"
                            id="mail">
                    </div>

                    <button
                        class="btn btn-primary w-100 mt-4"
                    >
                        შესვლა
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthorizationModal",

    data() {
        return {
            mail: null
        }
    }
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
</style>