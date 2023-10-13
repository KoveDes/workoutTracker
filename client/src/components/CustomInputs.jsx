import React, {useState} from 'react';
import {useField} from "formik";

export default function CustomInput({label, ...props}) {
    const [field,meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id}>{label}</label>
            <input {...field} {...props}
                   className={meta.touched && meta.error ? 'input-error' : ''}
            />
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    );
}

export function CustomCheckbox ({ label, ...props }) {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <div className="checkbox">
                <input
                    type='checkbox'
                    {...field}
                    {...props}
                    className={meta.touched && meta.error ? "input-error" : ""}
                />
                <label htmlFor={props.id}>{label}</label>
            </div>

            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};

export function PasswordInput({label,emojiVisible='🤗', emojiInvisible='🤐', ...props}) {
    const [field,meta] = useField(props);
    const [visible,setVisible] = useState(false);
    const handleClick = () => {
        setVisible(!visible);
    }

    return (
        <>
            <label htmlFor={props.id}>{label}</label>
            <div className="passwordContainer">
                <input {...field} {...props}
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

