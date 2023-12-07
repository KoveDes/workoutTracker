import axios from "axios";

export const fetchRapidAPIData = async(url, options) => {
    return await axios.get(url, options);
}

export const ytSearchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, //deployment
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
}


export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
}
