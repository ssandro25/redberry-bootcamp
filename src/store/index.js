import {createStore} from 'vuex'

export default createStore({
    state: {
        authorized: localStorage.getItem('authorized') ? Boolean(localStorage.getItem('authorized')) : false,
        chosenCategory : localStorage.getItem('chosenCategory') ? JSON.parse(localStorage.getItem('chosenCategory')) : []
    },

    getters: {
        getAuthorized: state => state.authorized,
        getChosenCategory: state => state.chosenCategory
    },

    mutations: {},

    actions: {
        setAuthorized({state}, value) {
            state.authorized = value
            localStorage.setItem('authorized', value.toString())
        },

       setChosenCategory({state}, category) {
           state.chosenCategory.push({id: category})

           localStorage.setItem('chosenCategory', JSON.stringify(state.chosenCategory))
       },

        removeChosenCategory({ state }, categoryId) {
            state.chosenCategory = state.chosenCategory.filter(category => category.id !== categoryId);

            localStorage.setItem('chosenCategory', JSON.stringify(state.chosenCategory))
        }
    },

    modules: {}
})
