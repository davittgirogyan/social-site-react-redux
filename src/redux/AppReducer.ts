import { getAuthUserData } from "./AuthReducer";

const INITIALIZED_SUCCESS =  "INITIALIZED_SUCCESS";

export type InitialStateType={
    initialized:boolean,
}

let initialState:InitialStateType = {
    initialized: false
};

const AppReducer = (state=initialState,action:any):InitialStateType=>{

        switch(action.type){
            case INITIALIZED_SUCCESS:
                return{
                    ...state,
                    initialized:true, 
                };

            default:
                return state;
        }
}

type InitializedSuccessActionType ={
    type: typeof INITIALIZED_SUCCESS
}

export let initializedSuccess = () : InitializedSuccessActionType=>({type:INITIALIZED_SUCCESS});

export let initializeApp = () => (dispatch:any)=>{

    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
    .then(()=>{
        dispatch(initializedSuccess());
    })


}



export default AppReducer;