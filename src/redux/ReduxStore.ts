import {createStore, combineReducers,applyMiddleware} from 'redux'; 
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import AlbumsReducer from './AlbumsReducer';
import PostsJsonReducer from './PostsJsonReducer';
import DialogsReducer from './DialogsReducer';
import ProfileReducer from './ProfileReducer';
import SidebarReducer from './SlidebarReducer';
import UsersReducer from './UsersReducer';
import AuthReduces from './AuthReducer';
import CatsReducer from './CatsReducer';
import AppReducer from './AppReducer';



let rootReducer = combineReducers({
    dialogsPage :DialogsReducer,
    profilePage :ProfileReducer,
    sidebar     :SidebarReducer,
    usersPage   :UsersReducer,
    auth        :AuthReduces,
    form        :formReducer,
    app         :AppReducer,
    cats        :CatsReducer,
    albums      :AlbumsReducer,
    postsJson   :PostsJsonReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));



export default store;