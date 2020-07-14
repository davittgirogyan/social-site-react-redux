import React,{useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader';
import userPhoto from './../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';



const ProfileInfo = (props)=>{

    const [editMode, setEditMode] = useState(0);
    if(!props.profile){
        return <Preloader/>
    }
    const onMainPhotoSelected = (e)=>{
        if(e.target.files.length){
            props.savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData)=>{
        props.saveProfile(formData).then(()=>{
            setEditMode(false);
        });
      
    }
    return(
        <div className={style.menu}>
            <div>
            
                {editMode
                ?<ProfileDataForm initialValues={props.profile} profile={props.profile} lookingForAJob={props.profile.lookingForAJob} 
                lookingForAJobDescription={props.profile.lookingForAJobDescription}
                contacts={props.profile.contacts}
                fullName={props.profile.fullName}
                aboutMe={props.profile.aboutMe}
                onSubmit={onSubmit}/>
                :<ProfileData  lookingForAJob={props.profile.lookingForAJob} 
                             lookingForAJobDescription={props.profile.lookingForAJobDescription}
                             contacts={props.profile.contacts}
                             fullName={props.profile.fullName}
                             aboutMe={props.profile.aboutMe}
                    />
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

                {props.isOwner?<button onClick={()=>{editMode?setEditMode(false):setEditMode(true)}}>Edit</button>:null}    
                <img alt={props.profile.fullName} src={props.profile.photos.large = props.profile.photos.large || userPhoto} />
                {props.isOwner && <div><span>Edit Photo</span> <input onChange={onMainPhotoSelected} type={"file"}/></div>}
            </div>
        </div>
    )


}

const ProfileData = ({lookingForAJob,lookingForJobADescription,contacts,fullName,aboutMe})=>{
   return( <div>
        <h1>{fullName}</h1>
        <h4>{aboutMe}</h4>
        <div>
            <b>Looking For Job:</b>{lookingForAJob ? "Yes":"No"}
        </div>
        {lookingForAJob &&
        <div>
            <b>SKILLS</b>{lookingForJobADescription ? "Yes":"No"}
        </div>    
        }  
        {Object.keys(contacts).map(key=>{
            return <Contact key={key} contactTitle={key} contactValue={contacts[key]} />
        })}              
    </div>
    )
}

const Contact = ({contactTitle,contactValue})=>{
    return(
        <div>
            <b>{contactTitle}</b>{contactValue}
        </div>
    )
}

export default ProfileInfo;