import React from 'react';
import { Field,  reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from './../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from './../../redux/AuthReducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';


const LoginForm = (props)=>{
    return <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder="email" name="email" component={Input} validate={[required]}   />
                </div>
                <div>
                    <Field placeholder="password" name="password" component={Input} validate={[required]}   />
                </div>
                <div>
                    <Field name="rememberMe" component={Input} type="checkbox" />Remember me
                </div>
                { props.catpchaUrl && <img alt={"Captcha"} src={props.catpchaUrl} />}
                { props.catpchaUrl &&  createField("Symbols from image","captcha",[required],Input,{},)}
   
                {props.error &&
                    <div className={style.formSummaryError}>
                            {props.error}
                    </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
  })(LoginForm)

const Login = (props)=>{
    const onSubmit = (formData)=>{
        props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }
    if(props.isAuth){ return <Redirect to={"/profile"}/>}

        return <div>
        <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} catpchaUrl={props.catpchaUrl}/>
        </div>

}

const mapStateToProps = (state)=>({
    isAuth:state.auth.isAuth,
    catpchaUrl:state.auth.catpchaUrl
})

export default connect(mapStateToProps,{login})(Login);