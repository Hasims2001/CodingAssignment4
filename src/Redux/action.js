import axios from "axios"
import { ERROR, GOTCHARACTER, LOADING } from "./actionType";

export const getCharacter = async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get('https://akabab.github.io/superhero-api/api/all.json')
        res = await res?.data;
        dispatch({type: GOTCHARACTER, payload: res})
    } catch (error) {
        dispatch({type: ERROR, payload: error.message})
    }
}

