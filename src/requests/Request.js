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

    postBlog(title, description, image, author, publish_date, categories, email) {
        let formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        for(let file of image){
            formData.append('image', file)


        }
        formData.append('author', author)
        formData.append('publish_date', publish_date)
        formData.append('categories', categories)
        formData.append('email', email)

        return axios.post('blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}