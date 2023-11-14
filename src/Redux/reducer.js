import { DELETECHARACTER, ERROR, FAVCHARACTER, GOTCHARACTER, LOADING } from "./actionType"

const init = {
    characters : JSON.parse(localStorage.getItem('characters')) || [],
    loading: false,
    error : "",
    fav_characters: JSON.parse(localStorage.getItem('fav_characters')) || [],
}


export const reducer = (state=init, {type, payload})=>{
    switch(type){
        case LOADING:
            return {
                ...state,
                loading : true
            }
        case ERROR:
            return{
                ...state,
                loading : false,
                error : payload
            }
        case GOTCHARACTER:
            localStorage.setItem('characters', JSON.stringify(payload))
            return {
                ...state,
                loading: false,
                error: "",
                characters: payload
            }

        case DELETECHARACTER:
            let updated = state.characters;
            let updated_fav = state.fav_characters;
            for(let i=0; i<payload.length; i++){
                updated = updated.filter(item=> item.id !== payload[i])
                updated_fav = updated_fav.filter(item=> item.id !== payload[i])
            }
            localStorage.setItem('characters', JSON.stringify(updated))
            localStorage.setItem('fav_characters', JSON.stringify(updated_fav))
            return {
                ...state,
                loading: false,
                error: "",
                characters: updated,
                fav_characters: updated_fav
            }
        case FAVCHARACTER:
            let curr = state.fav_characters;
            let char = state.characters;
            for(let i=0; i<payload.length; i++){
                let temp = char.filter(item=> item.id === payload[i])
                curr.push(...temp)
            }
            localStorage.setItem('fav_characters', JSON.stringify(curr))
            return{
                ...state,
                loading:false,
                error:"",
                fav_characters: curr
            }
        default:
            return state;
    }
}