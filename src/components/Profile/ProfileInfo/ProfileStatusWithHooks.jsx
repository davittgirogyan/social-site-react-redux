import React,{useState,useEffect} from 'react';
// import style from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props)=> {

    let NewStatus = props.status || "aaa";
    let [editMode,setEditMode] = useState(false);
    let [status,setStatus] = useState(NewStatus);

    useEffect(()=>{
        setStatus(props.status);
    },[props.status])

    const activateMode = ()=>{
        setEditMode(true);
    }
    const deactivateEditMode = ()=>{
        setEditMode(false);
        props.updateStatus(status);

    }
    const onStatusChange = (e)=>{
        setStatus(e.currentTarget.value)
    }

    return(

            <div>
                { !editMode &&
                    <div >
                        
                        {props.status!==""
                        ? <b><span onDoubleClick={activateMode} >{props.status}</span></b>
                        : <b><span onDoubleClick={activateMode} >write status...</span></b>
                        }
                    </div>
                }
                {editMode &&
                    <div >
                        <input placeholder='asd' onBlur={deactivateEditMode} onChange={onStatusChange}  autoFocus={true} value={status} />
                    </div>
                }
            </div>
        )
    

}


export default ProfileStatusWithHooks;