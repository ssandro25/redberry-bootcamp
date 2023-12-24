import axios from "axios";

export default class Api {
    getCategories() {
        return axios.get('categories')
    }

    getBlogs() {
        return axios.get('blogs')
    }

    login(email) {
        return axios.post('login', {email})
    }
}