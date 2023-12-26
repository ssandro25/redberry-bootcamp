import {createStore} from 'vuex'

export default createStore({
    state: {
        chosenCategory : localStorage.getItem('chosenCategory') ? JSON.parse(localStorage.getItem('chosenCategory')) : []
    },

    getters: {
        getChosenCategory: state => state.chosenCategory
    },

    mutations: {},

    actions: {
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
