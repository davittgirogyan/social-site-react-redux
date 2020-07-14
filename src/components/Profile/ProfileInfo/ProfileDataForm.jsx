import React from 'react';
import {reduxForm } from 'redux-form';
import {createField, Input,Textarea } from '../../common/FormsControls/FormsControls';


const ProfileDataForm = ({lookingForAJob,lookingForJobDescription,contacts,fullName,aboutMe,handleSubmit,profile,error})=>{
    return(
        <form onSubmit={handleSubmit}>
            {createField("Full name","fullName",[],Input,{value:fullName},"Full name")}
            {createField("","lookingForAJob",[],Input,{type:"checkbox",value:lookingForAJob},"lookingForJob")}
            {createField("My Professional Skills","lookingForAJobDescription",[],Textarea,{value:lookingForJobDescription},"My Professional Skills")}
            {createField("About Me","aboutMe",[],Input,{value:aboutMe},"About Me")}
            {/* {createField("Full name","fullName",[],Input,{},)} */}
            <div>
                <b>Contacts</b> {Object.keys(profile.contacts).map(response=>{return  <div key={response}>{createField(response,"contacts."+response,[],Input,{value: profile.contacts[response]},response)}</div> })}
            </div>
            {error &&
                <div style={{color:"red"}}>
                        {error}
                </div>
                }
            <button>Save</button>
        </form>
    )
}
const ReduxFormUserData = reduxForm({
    // a unique name for the form
    form: 'edit_user_data'
})(ProfileDataForm)


export default ReduxFormUserData;