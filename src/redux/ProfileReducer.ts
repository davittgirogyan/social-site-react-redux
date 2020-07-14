
import  {UsersAPI, profileAPI}  from '../api/api';
import { stopSubmit } from 'redux-form';
import { PostType, ProfileType, PhotosType } from '../types/types';
const ADD_POST =  "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts : [
        {id:1,name:"Gexam", likes:3},
        {id:2,name:"Vazgen", likes:8},
        {id:3,name:"Frankeynshteyn", likes:3},
        {id:4,name:"Abulalaamahari", likes:3}
      ] as Array<PostType>,
    profile:null as ProfileType | null,
    status:'',
    newPostText:''

};

export type initialStateType = typeof initialState

const ProfileReducer = (state=initialState,action:any):initialStateType=>{

        switch(action.type){
            case ADD_POST:{
              let newPost = {
                id:state.posts.length+1,
                name:action.text,
                likes:5,
              };
              return{
                ...state,
                posts:[...state.posts,newPost],
                newPostText:''
                
              }
            }
            case SET_USER_PROFILE:{
              return{
                ...state,
                profile: action.profile  
              }
            }
            case SET_STATUS:{
              return{
                ...state,
                status: action.status
              }
            }
            case SAVE_PHOTO_SUCCESS:{
                return{
                    ...state,
                    profile:{...state.profile,photos:action.photos} as ProfileType
                }
            }
            default:
                return state;
        }
}

type AddPostActionCreaterActionType = {
  type: typeof ADD_POST
  text: string
}

export let addPostActionCreater = (text:string):AddPostActionCreaterActionType=>({ type:ADD_POST,text});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType | null
}

export let setUserProfile = (profile:ProfileType):SetUserProfileActionType=>({type:SET_USER_PROFILE,profile});

type SetStatusActionType = {
  type: typeof SET_STATUS
  status:string
}

export let setStatus = (status:string):SetStatusActionType=>({type:SET_STATUS,status});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}

export let savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType=>({type:SAVE_PHOTO_SUCCESS,photos})

export let getUserProfile = (userId:number=5)=>{
  return (dispatch:any)=>{
    UsersAPI.getProfile(userId).then((response:any)=>{
      dispatch(setUserProfile(response.data));
  });
  }
}
export let getStatus = (userId:number)=>{
  return (dispatch:any)=>{
    profileAPI.getStatus(userId).then((response:any)=>{
      dispatch(setStatus(response.data));
  });
  }
}
export let updateStatus = (status:string)=>{
  return (dispatch:any)=>{
    profileAPI.updateStatus(status).then((response:any)=>{
      if(response.data.resultCode===0){
        dispatch(setStatus(status));
      }else{alert("Chexav")}
  });
  }
}

export const savePhoto = (photo:any)=> async (dispatch:any)=>{
    const response = await profileAPI.updatePhoto(photo);
    if(response.data.resultCode===0){
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (data:any)=> async (dispatch:any,getState:any)=>{
    const response = await profileAPI.saveUserData(data);
    if(response.data.resultCode===0){
        const userId = getState().auth.userId;
        dispatch(getUserProfile(userId))
    }else{
        let errorMsg = response.data.messages[0] 
        let action = stopSubmit("edit_user_data",{_error:errorMsg});
        dispatch(action);
        return Promise.reject(errorMsg);
    }
}


export default ProfileReducer;