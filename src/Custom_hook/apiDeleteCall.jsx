
import axios from "axios"


export default async function UseApiDelete(val) {

   console.log(val)
   const path = val.path
   const data = val.body
 
   const back_api = process.env.REACT_APP_API_URL ;

   console.log(back_api)

    const result = await axios.delete(`${back_api}${path}`,{data:data})

    console.log(result.data)


    return result.data
    

}