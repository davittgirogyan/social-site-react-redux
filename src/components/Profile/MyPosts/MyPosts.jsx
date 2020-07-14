import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Field,  reduxForm } from 'redux-form';
import { required,maxLengthCreator } from './../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxlength10 = maxLengthCreator(10);

const MyPostsForm = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name={"text"} component={Textarea} placeholder="Post text"
                validate={[required,maxlength10]}  />
            <button>Add Post</button>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({
    // a unique name for the form
    form: 'add_post'
  })(MyPostsForm)

const MyPosts = React.memo((props)=>{
    const onSubmit = (values)=>{
        props.addPost(values.text);
    }
    let p = props.Posts.map(p =><Post name={p.name} likes={p.likes} key={p.id}/>  )
    return(
        <div>
            <div className={style.new_post}>
                <h3>New Post</h3>
                <MyPostsReduxForm onSubmit={onSubmit}/>
            </div>
                <h3>My Posts</h3>
            <div className={style.posts}>
                    {p}
            </div>
        </div>
    )
})

export default MyPosts;