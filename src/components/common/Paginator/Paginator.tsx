import React, { useState } from 'react';
import style from './../../Users/Users.module.css';
import s from './Paginator.module.css';

type PropType={
    totalItemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged:(pageNumber:number)=>void
}


const Paginator:React.FC<PropType> = ({totalItemsCount,pageSize,currentPage,onPageChanged})=>{
    let portionSize=10
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages:Array<number> = [];
    for(let i=1; i<=pagesCount; i++){
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber,setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1)* portionSize+1;
    let rightPortionPageNumber = portionNumber*portionSize;

    return(
        <div className={s.pagination}>
            {portionNumber>1 && <a className={s.prev} onClick={()=>{setPortionNumber(portionNumber-1)}}>&#8249;</a>}
            {pages.filter((p)=>  p>=leftPortionPageNumber && p<=rightPortionPageNumber).map((page,index)=>
                <span key={page} className={currentPage===page? style.selectedPage:s.default} onClick={
                    (e)=>{
                    onPageChanged(page)
                    }
                    } >{index!==0? '/' :''} <span>{page}</span></span>
            )}
            {portionCount > portionNumber && <a className={s.next} onClick={()=>{setPortionNumber(portionNumber+1)}}> &#8250;</a>}
        </div>
    )
}


export default Paginator;