import Axios from "axios";

const Api = Axios.create({ baseURL: 'http://localhost:3500'});

export const fetchPosts = () => Api.get('/products');
export const createPosts = (url, post) => Api.post(url, post);
export const updatePosts = (url, post) => Api.patch(url, post);