import React, {useEffect, useState} from 'react';
import {useField} from "formik";
import {FormControlLabel, IconButton, InputAdornment, Radio, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function CustomInput({label,adornment, ...props}) {
    const [field, meta, helpers] = useField(props);
    const id = props.name;

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <TextField
                size='small' fullWidth
                error={!!(meta.touched && meta.error)}
                InputProps={{
                    endAdornment: adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null,
                }}

                {...field} {...props} id={id} type={props.type || "text"}
                // className={meta.touched && meta.error ? 'input-error' : ''} //style MUI classes instead
            />
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    );
}

export function CustomRadio({label, ...props}) {
    const [field, meta] = useField(props);
    return (
        <>
            {/*{JSON.stringify()}*/}


            <label  className={meta.touched && meta.error ? 'error' : ''} >{label}
                <input {...field} {...props}  type='radio'
                       checked={field.value === props.value}
                       // className={meta.touched && meta.error ? 'input-error' : ''}
                />
            </label>

        </>
    );
}


export function CustomCheckbox({label, ...props}) {
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

export function PasswordInput({label, emojiVisible = '🤗', emojiInvisible = '🤐', ...props}) {
    const [field, meta] = useField(props);
    const [visible, setVisible] = useState(false);
    const id = props.name;
    const handleClick = () => {
        setVisible(!visible);
    }

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <div className="passwordContainer">
                <TextField
                    error={!!(meta.touched && meta.error)}
                    fullWidth
                    size='small'

                    // END OF MUI PROPS
                    {...field} {...props}
                    id={id}
                    type={visible ? 'text' : 'password'}
                    className={meta.touched && meta.error ? 'input-error' : ''}

                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleClick}>
                                {visible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        ),
                    }}

                />
                {/*<p className='togglePwd' onClick={handleClick}>{visible ? emojiVisible : emojiInvisible}</p>*/}
            </div>
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    )
}

