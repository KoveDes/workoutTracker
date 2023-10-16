import React, {useState} from 'react';
import {useField} from "formik";

export default function CustomInput({label, ...props}) {
    const [field,meta] = useField(props);
    const id = props.name
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input {...field} {...props} id={id} type={props.type || "text"}
                   className={meta.touched && meta.error ? 'input-error' : ''}
            />
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    );
}
export  function CustomRadio({label, ...props}) {
    const [field,meta] = useField(props);
    const id = props.value
    return (
        <>
            <label htmlFor={id}>{label}
            <input {...field} {...props} id={id} type='radio'
                   className={meta.touched && meta.error ? 'input-error' : ''}
            />
            </label>
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    );
}


export function CustomCheckbox ({ label, ...props }) {
    const [field, meta] = useField({...props, type: 'checkbox'});
    const id = props.name

    return (
        <>
            <div className="checkbox">
                <input
                    type='checkbox'
                    {...field}
                    {...props}
                    id={id}
                    className={meta.touched && meta.error ? "input-error" : ""}
                />
                <label htmlFor={id}>{label}</label>
            </div>

            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};

export function PasswordInput({label,emojiVisible='🤗', emojiInvisible='🤐', ...props}) {
    const [field,meta] = useField(props);
    const [visible,setVisible] = useState(false);
    const id = props.name;
    const handleClick = () => {
        setVisible(!visible);
    }

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className="passwordContainer">
                <input {...field} {...props}
                    id={id}
                       type={visible ? 'text' : 'password'}
                       className={meta.touched && meta.error ? 'input-error' : ''}
                />
                <p className='togglePwd' onClick={handleClick}>{visible ? emojiVisible : emojiInvisible}</p>
            </div>
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    )
}

