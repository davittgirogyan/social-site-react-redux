import React, { FC } from 'react';
import style from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType={
    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    users:Array<UserType>
    followingInProgress:Array<number>
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void

}

let Users:FC<PropsType> = (props)=>{
        return(
        <div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged = {props.onPageChanged}/>
            <div className={style.users}>
                {props.users.map(user=> 
                        <User key={user.id} user={user} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />
                )}
           </div>
        </div>
    )
}


export default Users;