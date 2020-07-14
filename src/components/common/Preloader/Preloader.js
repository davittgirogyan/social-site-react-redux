import React from 'react';
import loaderImg from './../../../assets/images/loader.gif';


let Preloader = ()=>{

    return(
        <div>
            <img alt="loader" src={loaderImg}/>
        </div>
    )
}


export default Preloader;