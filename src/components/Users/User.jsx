import React from 'react';
import style from './Users.module.css';
import { NavLink } from 'react-router-dom';



export const User = (props)=>{
        return(
           <div key={props.user.id} className={style.user}>
                <span>
                    <div>
                        <NavLink to={'/profile/'+props.user.id}>
                        <img alt='asd' src={props.user.photos.small} className={style.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {props.user.followed 
                        ? <button disabled={props.followingInProgress.some(id=>id===props.user.id)} onClick={()=>{
                            props.unfollow(props.user.id)   
                        }} >Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id=>id===props.user.id)}  onClick={()=>{
                            props.follow(props.user.id)
                            }} >Follow</button> }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{props.user.name}</div>
                        <div>{props.user.status}</div>
                    </span>
                </span>
            </div>
    )
}


export default User;