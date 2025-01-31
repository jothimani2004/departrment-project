
import axios from "axios"




export default async function UseApi({path,body = { }}) {

   console.log({path,body})
   const back_api = ""
   console.log()

    const result = await axios.post(`${back_api}${path}`,body)

    console.log(result.data)


    return result.data

}