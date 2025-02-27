
import axios from "axios"


export default async function UseApiPut(val) {

   console.log(val)
   const path = val.path
   const data = val.body
   const back_api = process.env.REACT_APP_API_URL;

   console.log(data,"from put call")

    const result = await axios.put(`${back_api}${path}`,data)

    console.log(result.data)


    return result.data
    

}