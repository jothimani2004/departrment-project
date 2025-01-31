import axios from "axios"


export default async function UseApiGet(path) {

   console.log(path)
   const back_api = "http://localhost:5000"

    const result = await axios.get(`${back_api}${path}`)

    console.log(result.data)


    return result.data

}