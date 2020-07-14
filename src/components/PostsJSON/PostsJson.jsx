import React from 'react';
import { connect } from 'react-redux';
import style from './PostsJson.module.css';
import { getPostsJsonFromApi,deleteJsonPost,getSingleJsonPost } from '../../redux/PostsJsonReducer';

const PostsJson = (props)=>{
    const getPostsJsonFromApi = ()=>{
        props.getPostsJsonFromApi()
    }
    const deleteJsonPost = (id)=>{
        props.deleteJsonPost(id);
    }
    const singleJsonPost = (id)=>{
        props.getSingleJsonPost(id);
    }
    return(
        <div>    
            <h1>JSON posts</h1>
            <button onClick={getPostsJsonFromApi}>Get Posts</button>
            {props.postsJson.map(res=>{
                return <div key={res.id}  className={style.content}>
                    <span className={style.id}>userId:{res.userId}</span>
                    <span className={style.userId}>Id:{res.id}</span>
                    <span onClick={()=>singleJsonPost(res.id)} className={style.title}>Title:{res.title}</span><br/>
                    <span className={style.body}>Body:{res.body}</span>
                    <button onClick={()=>deleteJsonPost(res.id)}>Delete</button>
                </div>
            })}
        </div>
    )
}

let mapSateToProps=(state)=>({
    postsJson:state.postsJson.jsonPosts
})

export default connect(mapSateToProps,{getPostsJsonFromApi,deleteJsonPost,getSingleJsonPost})(PostsJson);