<template>
    <div class="success__added position-absolute top-50 start-50 translate-middle bg-white text-center">
        <div class="close__modal">
            <router-link to="/" class="d-block">
                <img :src="CloseIcon" alt="">
            </router-link>

        </div>
        
        <img :src="SuccessCheckIcon" alt="">

        <p class="success__added__message mt-3 mb-0">
            ჩანაწი წარმატებით დაემატა
        </p>

        <button
            :disabled="getAddedSuccess"
            class="btn btn-primary w-100 mt-5"
            @click="goToMainPage()"
        >

            <span v-if="!getAddedSuccess">
               მთავარ გვერდზე დაბრუნება
            </span>

            <span v-else>
                <span class="spinner-border spinner-border-sm me-1"></span>
                <span role="status">ბლოგი იტვირთება</span>
            </span>

        </button>
    </div>

    <div class="message__backdrop">

    </div>
</template>

<script>
import SuccessCheckIcon from "@/assets/images/tick-circle.svg"
import CloseIcon from "@/assets/images/close.svg"

export default {
    name: "SuccessAdded",

    data() {
        return {
            SuccessCheckIcon,
            CloseIcon,
            getAddedSuccess : false,
        }
    },

    methods: {
        goToMainPage() {
            this.getAddedSuccess = true;
            setTimeout(()=> {
                location.href = "/"
            }, 500)
        }
    },
}
</script>

<style scoped lang="scss">
.success__added {
    z-index: 1022;
    width: 480px;
    height: 300px;
    border-radius: 12px;
    padding: 64px 24px 40px;

    &__message {
        color: #1A1A1F;
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
    }

    .close__modal {
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
.message__backdrop {
    position: fixed;
    z-index: 1020;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(26, 26, 31, 1);
    opacity: 0.24;
}
</style>