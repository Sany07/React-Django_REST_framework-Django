import axios from 'axios';


const url = 'http://127.0.0.1:8000/api/';


export const Data = async () => {
    try{
        try {
            const { data } = await axios.get(url);
            return {
                todos: data.data
            }
        } catch (error) {

                console.log(err);

        }


    }catch(error){

    }
}
