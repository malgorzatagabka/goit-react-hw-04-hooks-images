import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = "20030683-6dee36cad7bf99771c158b063";

export const getImages = async(searchValue, page, perPage) => {
 
    const response = await axios.get(`?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safeSearch=true&page=${page}&per_page=${perPage}`);
    return response.data

}



