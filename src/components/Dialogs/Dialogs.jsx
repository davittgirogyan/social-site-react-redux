import React from 'react';
import style from './Dialogs.module.css';
import DialogItems from './DialogItems/DialogItems';
import Message from './Message/Message';
import { Field,reduxForm } from 'redux-form';
import { Textarea } from './../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from './../../utils/validators/validators';

const maxLength30 =  maxLengthCreator(30)

const NewMsgForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name={"text"} validate={[required,maxLength30]} component={Textarea} />
            <button>Add Msg</button>
        </form>

    )
}

const NewMsgReduxForm = reduxForm({
    // a unique name for the form
    form: 'add_msg'
  })(NewMsgForm)
  


const Dialogs = (props)=>{
    const onSubmit = (values) =>{
        props.sendMsg(values.text);
    }

    let dial = props.dial.map(dial=><DialogItems id={dial.id} name={dial.name} key={dial.id}/> )
    let msg = props.msg.map(m=> <Message message={m.message} id={m.id} key={m.id} />)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dial}
            </div>
            <div className={style.messages}>
                {msg}
            </div>
                <NewMsgReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Dialogs;