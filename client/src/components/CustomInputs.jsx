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
    Slider,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

export function CustomSlider(
    {
        label,
        formater,
        position = 'center',
        displayLabel = 'on',
        min = 15,
        max = 300,
        step = 15,
        ...props
    }) {
    const [field, meta] = useField(props);
    return (
        <Grid container direction='column' alignItems={position}>
            <label style={{textAlign: 'center'}} htmlFor={field.name}>{label}
                <Typography component='p' fontWeight='bold'>{formater(field?.value || 0)}</Typography></label>
            <Slider
                sx={{
                    width: '75%',
                    '.MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
                        borderRadius: '15px',
                    },
                    ".MuiSlider-valueLabel:before": {
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

export default function CustomInput({width, label, adornment, ...props}) {
    const [field, meta] = useField(props);
    const id = props.name;

    return (
        <>
            {label ? <label htmlFor={id}>{label}</label> : null}
            <TextField
                size='small' fullWidth
                error={!!(meta.touched && meta.error)}
                InputProps={{
                    endAdornment: adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null,
                }}
                sx={{width: width || '100%'}}
                {...field} {...props} id={id} type={props.type || "text"}
            />
            {meta.touched && meta.error ? (
                <p className='error'>{meta.error}</p>
            ) : null}
        </>
    );
}

export function CustomInput2({label, adornment = '', ...props}) {
    const [field, meta] = useField(props);
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
        <label className={meta.touched && meta.error ? 'error' : ''}>{label}
            <input {...field} {...props} type='radio'
                   checked={field.value === props.value}
                   style={{
                       accentColor: 'black',
                       marginLeft: '5px',
                   }}
            />
        </label>
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
            border: '2px solid #dfe7ff',
            '::-webkit-scrollbar': {
                borderRadius: '0  20px 20px 0',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#dfe7ff',
                width: '50%',
                borderRadius: '20px',
            }
        }}>
            <RadioGroup
                sx={{backgroundColor: 'transparent', pl: '7.5px'}}
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

export function CustomCheckboxList(
    {
        label,
        exerciseValue,
        wrap = true,
        handleCheckboxChange,
        itemArray,
        param,
        ...props
    }) {
    const [meta] = useField(props);
    const id = props.name;
    return (<>
        <label htmlFor={id}>{label}</label>

        <Grid container wrap={wrap ? 'wrap' : 'nowrap'} sx={{
            width: wrap ? 'auto' : '100%',
            overflowX: wrap ? 'none' : 'scroll',
            maxHeight: wrap ? '25vh' : 'auto',
            overflowY: wrap ? 'scroll' : 'none',
            gap: '15px',
            borderRadius: '20px',
            border: '2px solid #dfe7ff',
            '::-webkit-scrollbar': {
                borderRadius: '0  20px 20px 0',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: '#dfe7ff',
                width: '50%',
                borderRadius: '20px',
            }

        }}>
            {itemArray.map((item) => (
                <CustomCheckbox label={item} name={props.name} value={item} key={item}/>
            ))}
        </Grid>
        {meta?.touched && meta.error && <div className="error">{meta.error}</div>}

    </>)
}


export function CustomCheckbox({label, showError = false, isChecked, ...props}) {
    const [field, meta] = useField({...props, type: 'checkbox'});
    const id = props.value;
    return (
        <>
            <Grid container wrap='nowrap' alignItems='center' justifyContent='flex-start'>

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

export function PasswordInput({label, ...props}) {
    const [field, meta] = useField(props);
    const [visible, setVisible] = useState(false);
    const id = props.name;
    const handleClick = () => {
        setVisible(!visible);
    }

    return (
        <Box>
            <label htmlFor={id}>{label}</label>
            <div className="passwordContainer">
                <TextField
                    error={!!(meta.touched && meta.error)}
                    fullWidth
                    size='small'
                    {...field} {...props}
                    id={id}
                    type={visible ? 'text' : 'password'}
                    className={meta.touched && meta.error ? 'input-error' : ''}

                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleClick}>
                                {visible ?
                                    <Visibility sx={{color: '#3b3b3f'}}/>
                                    : <VisibilityOff sx={{color: '#3b3b3f'}}/>}
                            </IconButton>
                        ),
                    }}
                />
            </div>
            {meta.touched && meta.error ? (
                <Typography variant='caption' className='error'>{meta.error}</Typography>
            ) : null}
        </Box>
    )
}

