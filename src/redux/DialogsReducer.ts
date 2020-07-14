
const ADD_MESSAGE = "ADD-MESSAGE";

type MessageType={
    id:number,
    message:string
}
type DialogType={
    id:number,
    name:string
}

let initialState = {
    messages :[
        {id:1,message:'asdasd'},
        {id:2,message:'Gagfdgdfdf gdf gdfg df go'},
        {id:3,message:'asd asdfg fdsgfd gfdsg dfsg dfs  g'},
        {id:4,message:'sdaf dsf sdf aewf sdferagt geges gtgfdsgds gfds g'},
        {id:5,message:'dsaf sdf rew rgdfsg stg dfgfdsgr gdfs gsdfg'},
        {id:6,message:'fds gsfdg sfdgreaf wef rsdgsdfgrsgd fsg fdg ds'},
      ] as Array<MessageType>,
              
    dialogs: [
        {id:1,name:'vaxo'},
        {id:2,name:'Gago'},
        {id:3,name:'Gexamik'},
        {id:4,name:'Gorik'},
        {id:5,name:'Suro'},
        {id:6,name:'Vzgo'}
    ] as Array<DialogType>,
    newMessageText:""
     
};

export type InitialStateType = typeof initialState;

const DialogsReducer = (state=initialState,action:any):InitialStateType=>{

    switch(action.type){

        case ADD_MESSAGE:{
            return{
                ...state,
                messages: [...state.messages,{id:state.messages.length+1,message:action.message}],
                newMessageText: ""
            }
        }
        default:
            return state;
    }
}

type AddMessageActionCreaterType = {
    type: typeof ADD_MESSAGE
    message: string
}

export let addMessageActionCreater = (message:string):AddMessageActionCreaterType =>({type:ADD_MESSAGE,message});

export default DialogsReducer;