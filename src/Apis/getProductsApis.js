import axios from "axios"


export const getProducts =async ()=>{
    const data = await axios.get(`http://localhost:5000/getProducts`)
    return data
}