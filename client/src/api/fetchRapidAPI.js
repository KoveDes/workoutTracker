import axios from "axios";

export const fetchRapidAPIData = async(url, options) => {
    return await axios.get(url, options);
}

export const ytSearchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '28e4c56cbdmshdb396c157ee277fp1cffc7jsn72380036d7df',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
}


export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '28e4c56cbdmshdb396c157ee277fp1cffc7jsn72380036d7df',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
}
