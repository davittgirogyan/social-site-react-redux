import  React  from 'react';
import style from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({input,meta,...props}) =>{
    const hasError = meta.error && meta.touched;
    return(
        <div className={style.formControl+' '+ (hasError && style.error)}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
            
        </div>
    )

}

export const Textarea = (props) =>{
    const {input,meta,child,...restProps} = props;
   return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) =>{
    const {input,meta,child,...restProps} = props;
   return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder="Name",name="name",validators,component,props={},text="")=>{
    return <div>
        {text}<Field placeholder={placeholder}
                name={name}
                validators={validators}
                component={component}
                {...props}
        />
    </div>
}

