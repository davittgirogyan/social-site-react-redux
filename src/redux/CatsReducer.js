import { CatsApi } from './../api/api';
const SET_SINGLE_CAT = "SET_SINGLE_CAT";

let initialState= {
    "cats":[]
}

const CatsReducer = (state=initialState,action)=>{
        switch(action.type){
            case SET_SINGLE_CAT:{
                return{
                    ...state,...state.cats,
                    cats:action.data
                }
            }
            default:
                return state;
        }


}

export const getCatsFromApi = (number)=> (disptach)=>{
    return new Promise((resolf)=>{
        CatsApi.getCatsWithApi(number).then(response=>{
            disptach(setSingleCat(response.data));
            resolf(true)
        }
    );
    })

}

export const setSingleCat = (data)=>({type:SET_SINGLE_CAT,data}) 


export default CatsReducer;