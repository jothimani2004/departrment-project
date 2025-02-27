
import axios from "axios"


export default async function UseApiPost({path,body = {}}) {

   console.log(path,body)
   const back_api = process.env.REACT_APP_API_URL ;

    const result = await axios.post(`${back_api}${path}`,body)

    console.log(result.data)


    return result.data
    

}