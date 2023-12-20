import axios from "axios";

export default class Api {
    getCategories() {
        return axios.get('https://api.blog.redberryinternship.ge/api/categories')
    }
}