import React from 'react';
import style from './Albums.module.css';
import { getAlbumsFromState,deleteAlbumsColumn,changeSerachText } from './../../redux/AlbumsReducer';
import { connect } from 'react-redux';


const Albums = (props)=>{
    const getAlbumsFromState = () =>{
        props.getAlbumsFromState();
    }
    const deleteAlbumsColumn = (id) =>{
        props.deleteAlbumsColumn(id)
    }
    const changeSerachText = (e)=>{
        props.changeSerachText(e.target.value);
    }

    return(
        <div>
            <button onClick={getAlbumsFromState}>Get Albums</button>
            <input onChange={changeSerachText} value={props.searchText}/>
            {props.albums.map(res=> 
            {
                if(res.title.includes(props.searchText)){
                    return <div key={res.id} className={style.content}>
                    <i>ID:</i>
                    <i className={style.id}>{res.id}</i>
                    <i>UserId:{res.userId}</i>
                    <i>Title:{res.title}</i><button onClick={() => deleteAlbumsColumn(res.id)}>Delete</button>
                </div>
                }
            }
            )}
        </div>
    )
}
let mapStateToProps = (state)=>({
   albums: state.albums.albums,
   searchText: state.albums.searchText 
})
    
export default connect(mapStateToProps,{getAlbumsFromState,deleteAlbumsColumn,changeSerachText})(Albums);
    

