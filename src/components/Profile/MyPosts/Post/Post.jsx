import React from 'react';
import style from './Post.module.css';

const Post = (props)=>{
    return(

        <div>
            <h3>{props.name}</h3>
            <img className={style.item_img} alt="post" src='https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg' />
            <span>Like {props.likes}</span> 
        </div>

    )
}


export default Post;