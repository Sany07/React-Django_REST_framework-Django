import axios from 'axios';


const url = 'http://127.0.0.1:8000/api/';

export const fetchData = async () => {
    const fetchDataurl = `${url}todos/`;
    try {

        const res = await axios.get(fetchDataurl);
        return res.data
        
    }
    catch (error) {
        console.log(error);
    }

}

