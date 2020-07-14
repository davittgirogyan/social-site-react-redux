
import ProfileReducer from './ProfileReducer';
import DialogsReducer from './DialogsReducer';

let store = {
_state :{
    profilePage : {
        posts : [
            {name:"Gexam", likes:'3'},
            {name:"Vazgen", likes:'8'},
            {name:"Frankeynshteyn", likes:'3'},
            {name:"Abulalaamahari", likes:'3'}
          ],
        newPostText:"your post"
        },

    dialogsPage : {
        messages :[
            {id:'1',message:'asdasd'},
            {id:'2',message:'Gagfdgdfdf gdf gdfg df go'},
            {id:'3',message:'asd asdfg fdsgfd gfdsg dfsg dfs  g'},
            {id:'4',message:'sdaf dsf sdf aewf sdferagt geges gtgfdsgds gfds g'},
            {id:'5',message:'dsaf sdf rew rgdfsg stg dfgfdsgr gdfs gsdfg'},
            {id:'6',message:'fds gsfdg sfdgreaf wef rsdgsdfgrsgd fsg fdg ds'},
          ],
                  
          dialogs: [
            {id:'1',name:'vaxo'},
            {id:'2',name:'Gago'},
            {id:'3',name:'Gexamik'},
            {id:'4',name:'Gorik'},
            {id:'5',name:'Suro'},
            {id:'6',name:'Vzgo'},
          ],
          newMessageText:"your Message",
    }
},
_callSubscriber(){
  console.log('State Changed');
},

subscribe(observer){
  this._callSubscriber = observer;
},
getState(){
  return this._state;
},

dispatch(action){
  this._state.profilePage = ProfileReducer(this._state.profilePage,action);
  this._state.dialogsPage = DialogsReducer(this._state.dialogsPage,action);
  // this._state.profilePage = ProfileReducer(this._state.profilePage,action);
  this._callSubscriber(this._state);

}

}


export default store;
