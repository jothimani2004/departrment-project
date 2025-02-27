import axios from "axios"


export default async function UseApiGet(path) {

   console.log(path)
   const back_api = process.env.REACT_APP_API_URL ;
 
    const result = await axios.get(`${back_api}${path}`)

    console.log(result.data)


    return result.data

}