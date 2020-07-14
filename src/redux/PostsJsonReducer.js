import { JsonPostsApi } from './../api/api';

const GET_POSTS_FROM_API = "GET_POSTS_FROM_API";
const DELETE_SINGLE_JSON_POST = "DELETE_SINGLE_JSON_POST";
const SINGLE_JSON_POST = "SINGLE_JSON_POST";


let initialState= {
    jsonPosts:[

    ]
}


const PostsJsonReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_POSTS_FROM_API:
            return{
                ...state,
                jsonPosts:action.jsonPosts
            }
        case DELETE_SINGLE_JSON_POST:
            let jsPosts = state.jsonPosts.filter(res=> res.id !== action.id);
            return{
                ...state,
                jsonPosts:[...state.jsonPosts],jsonPosts:jsPosts
            }
        case SINGLE_JSON_POST:
            let jsPost = state.jsonPosts.filter(res=> res.id === action.id)
            return{
                ...state,
                jsonPosts: jsPost
            }
        default:{
            return state;
        }
    }
}


export const getPostsJsonFromApi =()=>(dispatch)=>{
    JsonPostsApi.getJsonPostsApi().then(res=>{
        dispatch(getPostsFromApi(res.data));
    })
} 

export const getSingleJsonPost = (id)=>(dispatch)=>{
    dispatch(singleJsonPost(id))
}
export const deleteJsonPost= (id)=>(dispatch)=>{
    dispatch(deleteSingleJsonPost(id))
}
const singleJsonPost = (id)=>({type:SINGLE_JSON_POST,id})

const deleteSingleJsonPost = (id)=>({type:DELETE_SINGLE_JSON_POST,id})

const getPostsFromApi = (jsonPosts)=>({type:GET_POSTS_FROM_API,jsonPosts})



export default PostsJsonReducer;