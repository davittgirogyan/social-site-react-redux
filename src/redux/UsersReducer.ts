import { UsersAPI } from '../api/api';
import { UserType } from '../types/types';
import { AppStateType } from './ReduxStore';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
const FOLLOW =  "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS= "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS= "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users : [
      ] as Array<UserType>,
    pageSize : 50,
    totalUsersCount: 300,
    currentPage : 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
};

type InitialStateType = typeof initialState; 

const UsersReducer = (state=initialState,action:ActionsTypes) : InitialStateType=>{

        switch(action.type){
            case FOLLOW:
                return{
                    ...state,
                    users:[...state.users.map(u=>{
                        if(u.id===action.userId){
                            return {...u,followed:true}
                        }
                        return u;})]
                };
            case UNFOLLOW:
                return{
                    ...state,
                    users:[...state.users.map(u=>{
                        if(u.id===action.userId){
                            return {...u,followed:false}
                        }
                        return u;
                    })]
                }
            case SET_USERS:
                return{
                    ...state,
                    users : action.users
                }
            case SET_CURRENT_PAGE:
                return{
                    ...state,
                    currentPage:action.currentPage
                }
            case SET_TOTAL_USERS_COUNT:
                return{
                    ...state,
                    totalUsersCount:action.count
                }
            case TOGGLE_IS_FETCHING:
                return{
                    ...state,
                    isFetching: action.isFetching
                }
            case TOGGLE_IS_FOLLOWING_PROGRESS:
                return{
                    ...state,
                    followingInProgress:action.isFetching
                    ? [...state.followingInProgress,action.userId] 
                    : state.followingInProgress.filter(id=>id!==action.userId)
                }
            default:
                return state;
        }
}


type ActionsTypes = FollowSuccessActionType|UnFollowSuccessActionType|SetUsersActionType|SetCurrentPageActionType|
SetTotalUsersCountActionType|ToggleIsFetchingActionType|ToggleFollowingProgressActionType


type FollowSuccessActionType={
    type: typeof FOLLOW
    userId:number
}
type UnFollowSuccessActionType={
    type: typeof UNFOLLOW
    userId:number
}
type SetUsersActionType={
    type: typeof SET_USERS
    users:Array<UserType>
}
type SetCurrentPageActionType={
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
type SetTotalUsersCountActionType={
    type: typeof SET_TOTAL_USERS_COUNT
    count:number
}
type ToggleIsFetchingActionType={
    type: typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
type ToggleFollowingProgressActionType={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean,
    userId:number
}


export let followSuccess = (userId:number):FollowSuccessActionType=>({type:FOLLOW,userId});
export let unfollowSuccess = (userId:number):UnFollowSuccessActionType=>({type:UNFOLLOW,userId});
export let setUsers = (users:Array<UserType>):SetUsersActionType=>({type:SET_USERS,users});
export let setCurrentPage = (currentPage:number):SetCurrentPageActionType=>({type:SET_CURRENT_PAGE,currentPage});
export let setTotalUsersCount = (count:number):SetTotalUsersCountActionType=>({type:SET_TOTAL_USERS_COUNT, count});
export let toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType=>({type:TOGGLE_IS_FETCHING,isFetching});
export let toggleFollowingProgress = (isFetching:boolean,userId:number):ToggleFollowingProgressActionType=>({type:TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId});


type GetStateType=()=>AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes>

export const requestUsers =(page:number,pageSize:number,userPhoto:any):ThunkType=> {
    return async (dispatch:DispatchType,getState:GetStateType) =>{

            dispatch(toggleIsFetching(true))
            UsersAPI.getUsers(page,pageSize).then((data:any)=>{
                data.items.forEach((user:any)=>{
                    if(!user.photos.small){user.photos.small =  userPhoto;}
                })
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
                dispatch(setCurrentPage(page))
            });
    }
}



const _followUnFollowFlow = async (userId:number,dispatch:DispatchType,apiMethod:any,actionCreator:(userId:number)=>FollowSuccessActionType | UnFollowSuccessActionType)=>{
    dispatch(toggleFollowingProgress(true,userId))
    let data = await apiMethod
    if(data.resultCode === 0){
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false,userId))

}

export const follow =(userId:number):ThunkType=> async (dispatch) =>{
    _followUnFollowFlow(userId,dispatch,UsersAPI.followUser(userId),followSuccess)
}

export const unfollow =(userId:number):ThunkType=> async (dispatch) =>{
    _followUnFollowFlow(userId,dispatch,UsersAPI.unfollowUser(userId),unfollowSuccess)
}


export default UsersReducer;