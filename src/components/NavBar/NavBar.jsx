import React from 'react';
import style from "./NavBar.module.css";
import {NavLink}  from 'react-router-dom';

const NavBar =  ()=>{
    return(
        <nav className={style.nav}>
        <div className={`${style.item} ${style.active}`}>
          <NavLink to='/profile' activeClassName={style.active}>Profile</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to='/messages' activeClassName={style.active}>Messages</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to='/users' activeClassName={style.active}>Users</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to='/cats' activeClassName={style.active}>Cats :P</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to='/albums' activeClassName={style.active}>Albums</NavLink>
        </div>
        <div className={style.item}>
          <NavLink to='/posts_json' activeClassName={style.active}>Posts JSON</NavLink>
        </div>
      </nav>
    );
}


export default NavBar;