import { AlbumsApi } from "../api/api";

const SET_ALBUMS_DATA = "SET_ALBUMS_DATA";
const DELETE_SINGLE_ALBUM = "DELETE_SINGLE_ALBUM";
const EDIT_SEARCH_TEXT = "EDIT_SEARCH_TEXT";

let initialState = {
    albums:[  
    ],
    searchText:''
}


const AlbumsReducer = (state=initialState,action)=>{    
        switch (action.type){
            case SET_ALBUMS_DATA:{
                return  {
                    ...state,
                    albums:action.albums
                }
            }
            case DELETE_SINGLE_ALBUM:{
                let result = state.albums.filter(album => album.id !== action.id);
                return{
                    ...state,
                    albums:result
                }
            }
            case EDIT_SEARCH_TEXT:{

                return{
                    ...state,
                    searchText:action.searchText
                }
            }
            default:{
                return state
            }
        }
}

export const getAlbumsFromState = ()=>(dispatch)=>{
    AlbumsApi.getAlbumsFromApi().then(response=>{
        dispatch(setAlbumsDataFromApi(response.data))
    })

}

export const deleteAlbumsColumn = (id)=>(dispatch)=>{
    dispatch(deleteSingleAlbum(id))
}

export const changeSerachText = (searchText)=>(dispatch)=>{
    dispatch(editSearchText(searchText));
}

const editSearchText       = (searchText)=>({type:EDIT_SEARCH_TEXT,searchText})
const setAlbumsDataFromApi = (albums)=>({type:SET_ALBUMS_DATA,albums});
const deleteSingleAlbum    = (id)=>({type:DELETE_SINGLE_ALBUM,id})

export default AlbumsReducer;