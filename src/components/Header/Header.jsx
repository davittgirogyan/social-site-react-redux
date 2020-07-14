import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props)=>{
    return (
        <header className={style.header}>
        <NavLink to={'/'}><img alt="header" src="https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png"/></NavLink>
        <div className={style.loginBlock}>
            {!props.isAuth ? <NavLink to={'/login'} >Login</NavLink> : <span>{props.login}<button onClick={props.logout}>Logout</button></span> }
        </div>
        </header>
    );
    
}

export default Header;