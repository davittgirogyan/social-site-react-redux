import {addPostActionCreater} from '../../../redux/ProfileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

const mapStateToProps =(state)=>{
    return{
        Posts        : state.profilePage.posts,
        newPostText  : state.profilePage.newPostText
    }
}
const mapDispatchTooProps = (dispatch)=>{
    return{
        addPost : (text)=>{dispatch(addPostActionCreater(text))},
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchTooProps)(MyPosts);

export default MyPostsContainer;