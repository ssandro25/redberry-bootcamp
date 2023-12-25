import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/Index.vue'
import AddBlog from "@/views/AddBlog.vue";
import ViewBlog from "@/views/ViewBlog.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Index,
        meta: {
            title: 'Redberry - მთავარი გვერდი'
        }
    },

    {
        path: '/add-blog',
        name: 'add-blog',
        component: AddBlog,
        meta: {
            title: 'ბლოგის დამატება',
            required: true
        }
    },

    {
        path: '/blogs/:id',
        name: 'blog',
        component: ViewBlog,
        meta: {
            title: 'ბლოგის გვერდი'
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),

    scrollBehavior() {
        return {top: 0};
    },

    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    if (to.meta.required) {
        if (localStorage.getItem('authorized')) {
            next()
        } else {
            alert('გაიარეთ ავტორიზაცია')
            next('/')
        }
    } else {
        next()
    }
})

export default router
