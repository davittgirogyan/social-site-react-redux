import { authApi, securityApi } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA =  "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState= {
    userId: null as number | null,
    email:  null as string | null,
    login:  null as string | null,
    isAuth: false,
    catpchaUrl:null as boolean | null
};
export type InitialStateType = typeof initialState;
const AuthReduces = (state=initialState,action:any):InitialStateType=>{

        switch(action.type){
            case SET_USER_DATA:
                return{
                    ...state,
                    ...action.payload, 
                };
            case SET_CAPTCHA_URL:
                return{
                    ...state,
                    catpchaUrl:action.payload.captchaUrl
                }

            default:
                return state;
        }
}

type SetAuthDataActionPayloadType={
    userId:number|null,email:string|null,login:string|null,isAuth:boolean
}

type SetAuthUserDataActionType={
    type: typeof SET_USER_DATA,
    payload:SetAuthDataActionPayloadType
}

export let setAuthUserData = (userId:number|null,email:string|null,login:string|null,isAuth:boolean):SetAuthUserDataActionType=>({type:SET_USER_DATA,payload:{userId,email,login,isAuth}});

export type SetCaptchaUrlActionType={
    type: typeof SET_CAPTCHA_URL
    payload:{captchaUrl:string}
}

export let setCaptchaUrl = (captchaUrl:string):SetCaptchaUrlActionType=>({type:SET_CAPTCHA_URL,payload:{captchaUrl}});

export let getAuthUserData = () => async(dispatch:any)=>{
    let response = await authApi.me()
    if(response.data.resultCode === 0){
            let {id,login,email} = response.data.data;
            dispatch(setAuthUserData(id,email,login,true))
        }
}





export let getCaptchaUrl = () => async (dispatch:any)=>{
    let response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;
    console.log(captchaUrl);
    dispatch(setCaptchaUrl(captchaUrl));

}





export let login = (email:string,password:string,rememberMe:boolean,captcha:any) => async (dispatch:any)=>{
    console.log(captcha);
    let response = await authApi.login(email,password,rememberMe,captcha)
    if(response.data.resultCode === 0){
        dispatch(getAuthUserData());
    } else{
        if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let errorMsg = response.data.messages[0] || "Some Error"
        let action = stopSubmit("login",{_error:errorMsg});
        dispatch(action);
    }

}



export let logout = () => async (dispatch:any)=>{
    let response = await authApi.logout()
        if(response.data.resultCode === 0){
            dispatch(setAuthUserData(null,null,null,false));
        }
    }


export default AuthReduces;