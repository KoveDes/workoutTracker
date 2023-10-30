import React, {useState} from 'react';
import {useField} from "formik";
import {
    Box,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Slider, Switch,
    TextField, Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import {formatSeconds} from "../utils/formatters.js";

export  function CustomSwitch({label, ...props}) {
    const [field, meta, helpers] = useField(props);
    const id = props.name;
    return (
        <Grid container alignItems='center' gap='10px'>
            <p>{label}</p>
            <Switch
                size='small'
                {...field} {...props} id={id}
            />
        </Grid>
    );
}


export function CustomSlider({label,formater,displayLabel='on', min=15, max=300,step=15, ...props}) {
    const [field, meta, helpers] = useField(props);
    const id = props.name;
    return (
        <Grid container direction='column' alignItems='center'>
            <label style={{textAlign: 'center'}} htmlFor={field.name}>{label}
                <Typography component='p'
                    sx={{
                        textAlign: 'center'
                        // backgroundColor: 'forestgreen',
                        // color: 'white',
                        // width: 'max-content',
                        // p: ' 2px 15px',
                        // borderRadius: '15px',
                        // m: '10px 0'
                    }}
                    fontWeight='bold'>{formater(field?.value || 0)}</Typography></label>
            <Slider
                sx={{
                    '.MuiSlider-valueLabel.MuiSlider-valueLabelOpen' : {
                        borderRadius: '15px',
                    },
                    ".MuiSlider-valueLabel:before" : {
                        width: 0,
                    }
                }}
                valueLabelDisplay={displayLabel}
                step={step}
                marks
                min={min}
                max={max}
                valueLabelFormat={v => formater(v)}
                defaultValue={field.value}
                {...field} {...props}
            />
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </Grid>
    );
}

export default function CustomInput({label, adornment, ...props}) {
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

export function CustomInput2({label, adornment = '', ...props}) {
    const [field, meta, helpers] = useField(props);
    const id = props.name;

    return (
        <Box height='40px'>
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
        </Box>
    );
}

export function CustomRadio({label, ...props}) {
    const [field, meta] = useField(props);
    return (
        <>
            {/*{JSON.stringify()}*/}


            <label className={meta.touched && meta.error ? 'error' : ''}>{label}
                <input {...field} {...props} type='radio'
                       checked={field.value === props.value}
                    // className={meta.touched && meta.error ? 'input-error' : ''}
                />
            </label>

        </>
    );
}

export function CustomRadioList({label, exerciseValue, handleCheckboxChange, itemArray, param, ...props}) {
    const [field, meta] = useField(props);
    const id = props.name;
    return (<>
        <label htmlFor={id}>{label}</label>
        <Stack spacing={1} sx={{
            maxHeight: '25vh',
            overflowY: 'scroll',
            borderRadius: '20px',
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
            '::-webkit-scrollbar': {
                backgroundColor: '#e3e3e3',
                borderRadius: '0  20px 20px 0',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#3078a3',
                width: '50%',
                borderRadius: '20px',
            }
        }}>
            <RadioGroup
                sx={{backgroundColor: '#e3e3e3'}}


            >
                {itemArray.map((item) => (
                    <FormControlLabel

                        {...props}
                        {...field}
                        key={item} value={item}
                        control={<Radio
                        />} label={item}/>
                ))}
            </RadioGroup>
        </Stack>
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}

    </>)
}

export function CustomCheckboxList({label, exerciseValue, handleCheckboxChange, itemArray, param, ...props}) {
    const [field, meta] = useField(props);
    const id = props.name;
    return (<>
        <label htmlFor={id}>{label}</label>
        {/*<Stack spacing={1} sx={{*/}
        {/*    maxHeight: '25vh',*/}
        {/*    overflowY: 'scroll',*/}
        {/*    borderRadius: '20px',*/}
        {/*    boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",*/}
        {/*    '::-webkit-scrollbar': {*/}
        {/*        backgroundColor: '#e3e3e3',*/}
        {/*        borderRadius: '0  20px 20px 0',*/}
        {/*    },*/}
        {/*    '::-webkit-scrollbar-thumb': {*/}
        {/*        backgroundColor: '#3078a3',*/}
        {/*        width: '50%',*/}
        {/*        borderRadius: '20px',*/}
        {/*    }*/}
        {/*}}>*/}
        {/*<List*/}

        {/*    sx={{*/}
        {/*        backgroundColor: '#a3e3e3',*/}
        {/*        overflowY: 'scroll',*/}
        {/*        width: '50%',*/}
        {/*        p: 0,*/}
        {/*        m: 0,*/}
        {/*    }}*/}
        {/*>*/}
        <Grid container wrap='nowrap' sx={{
            width: '100%',
            overflowX: 'scroll',
            gap: '15px',
            '::-webkit-scrollbar': {
                backgroundColor: '#e9e9e9',
                borderRadius: '20px'
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#8eaac5',
                borderRadius: '20px',
            }

        }}>
            {itemArray.map((item) => (
                // <ListItem key={item}>
                //     <ListItemIcon>
                //         <CustomCheckbox label={item} name={props.name} value={item}/>
                //     </ListItemIcon>
                //     <ListItemText primary={item}/>
                // </ListItem>
                // <FormControlLabel
                //     key={item} control={<CheckBox {...props.name} checked={false}/> } label={item}/>
                <CustomCheckbox label={item} name={props.name} value={item} key={item}/>
            ))}
        </Grid>
        {/*</List>*/}
        {/*</Stack>*/}
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}

    </>)
}


export function CustomCheckbox({label, showError = false, isChecked, ...props}) {
    const [field, meta] = useField({...props, type: 'checkbox'});
    const id = props.value;
    return (
        <>
            <Grid container wrap='nowrap' alignItems='center' justifyContent='center'>

                <Checkbox
                    checked={field.checked}
                    onChange={field.onChange}
                    id={id}
                    inputProps={
                        {...field, ...props,}
                    }
                />
                <label htmlFor={id} style={{margin: 0}}>{label}</label>
            </Grid>
            {showError ? (meta.touched && meta.error && <div className="error">{meta.error}</div>) : null}

        </>
    );
}

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
                                {visible ? <Visibility/> : <VisibilityOff/>}
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

