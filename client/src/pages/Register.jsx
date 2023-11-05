import React, {useEffect, useState} from 'react';
import {Form, FieldArray, Formik, useFormik} from "formik";
import CustomInput, {CustomRadio, PasswordInput} from "../components/CustomInputs.jsx";
import {default as registerSchemaAuth, registerSchemaDetails} from "../schemas/registerSchema.js";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Grid,
    RadioGroup,
    Step,
    StepLabel,
    Stepper
} from "@mui/material";

const REGISTER_URL = '/register'

export function Register(props) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    return (<>

        <h1>Register</h1>
        <FormikStepper
            submittingText='Creating an account...'
            submitText='Sign up'
            initialValues={{
                login: '',
                password: '',
                matchPassword: '',
                email: '',
                username: '',
                gender: '',
                age: '',
                height: '',
                weight: ''
            }}

            onSubmit={async (values, actions) => {
                // setTimeout(() => {
                //     actions.setSubmitting(false);
                //     // actions.resetForm();
                //     setSuccess(true);
                // }, 2000);
                setError('');
                const {login, password} = values;
                alert(JSON.stringify(values));
                try {
                    // const response = await axios.post(
                    //     'http://localhost:3500/register',
                    //     JSON.stringify({login, password}),
                    //     {
                    //         headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //         withCredentials: true,
                    //     }
                    // );
                    // setSuccess(response.message);
                    actions.resetForm();
                } catch ({response}) {
                    // console.log(response.status);
                    setError(response.status === 409 ? response.data.message : "Error!")
                }

            }}
        >
            <FormikStep
                validationSchema={registerSchemaAuth}
                label='Authorization'
            >
                <Box>
                    <CustomInput
                        type='text'
                        label='Login'
                        name='login'
                        placeholder='login'
                        // autoFocus
                    />
                </Box>
                <Box>
                    <PasswordInput
                        label='Password'
                        name='password'
                        placeholder='password'
                    />
                </Box>
                <Box>
                    <PasswordInput
                        label='Confirm password'
                        name='matchPassword'
                        placeholder='password'/>
                </Box>
            </FormikStep>
            <FormikStep
                label='User information'
                validationSchema={registerSchemaDetails}
            >
                <Grid container
                      spacing={6} direction='row' wrap='nowrap'
                >
                    <Grid item>
                        <CustomInput
                            type='email'
                            label='Email'
                            name='email'

                            // autoFocus
                        />
                        <CustomInput
                            label='Username'
                            name='username'
                        />
                        <FormControl>
                            <FormLabel id='sex'>Gender</FormLabel>
                            <RadioGroup row id='sex'>
                                <CustomRadio
                                    label='Male'
                                    name='gender'
                                    value='male'
                                />
                                <CustomRadio
                                    label='Female'
                                    name='gender'
                                    value='female'
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {/*Gender checkbox    */}
                    <Grid item>
                        <CustomInput
                            name='age'
                            label="Age"
                            type='number'

                        />
                        <CustomInput
                            name='height'
                            label="Height (cm)"
                            type='number'
                            adornment='cm'
                        />
                        <CustomInput
                            name='weight'
                            label="Weight (kg)"
                            type='number'
                            adornment='kg'
                        />
                    </Grid>
                </Grid>

            </FormikStep>

            {/*    </>*/}
            {/*)}*/}

        </FormikStepper>
        {error ? <h1>{error}</h1> : null}
        {success ? (<section>
            <h1>{success}</h1>
            <div>{JSON.stringify(props.values)}</div>
        </section>) : null}
    </>)
}

export function FormikStepWithValues({children, formValues, ...props}) {

    return (
    <>
        {children({formValues})}
    </>
    )
    // return <>
    //     {children}
    //
    // </>
}

export function FormikStep({children, formValues, ...props}) {

    return <Grid container justifyContent='center'>
        {children}
    </Grid>;
    // return <>
    //     {children}
    //
    // </>
}


export function FormikStepper({children, submittingText, submitText, exercises, ...props}) {
    const childrenArr = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [newInit, setNewInit] = useState(props.initialValues);
    const [completed, setCompleted] = useState(false);
    const currentChild = childrenArr[step];
    const isLastStep = step === childrenArr.length - 1;



    return (<Formik {...props}
                    validationSchema={currentChild.props?.validationSchema}
                    onSubmit={async (values, actions) => {
                        if (isLastStep) {
                            await props.onSubmit(values, actions);
                            setCompleted(true);

                        } else {
                            await actions.setTouched({}, false)
                            setStep(s => s + 1);
                        }
                    }}
    >
        {(props) => (<Form style={{maxWidth: 'initial'}}>
            {/*<pre>{JSON.stringify(props.values, undefined, 1)}</pre>*/}
            <Stepper alternativeLabel activeStep={step}>
                {childrenArr.map((child, index) => (
                    <Step key={child?.props.label} completed={step > index || completed}>
                        <StepLabel>{child?.props.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {React.cloneElement(currentChild, {formValues: props.values})}
            <Grid container spacing={2} paddingTop={2} justifyContent='center'>
                {step > 0 ? <Grid item>
                    <Button
                        variant='outlined'
                        disabled={props.isSubmitting}
                        onClick={() => setStep(s => s - 1)}>Back</Button>
                </Grid> : null}
                {JSON.stringify(props.errors)}

                <Grid item>
                    <Button
                        startIcon={props.isSubmitting ? <CircularProgress size='1rem'/> : null}
                        disabled={props.isSubmitting}
                        variant={isLastStep ? 'contained' : 'outlined'} color='primary'
                        type='submit'>{props.isSubmitting ? submittingText : isLastStep ? submitText : 'Next'}</Button></Grid>
            </Grid>
        </Form>)}
    </Formik>)
}


export function RegisterForm(props) {
    const formik = useFormik({
        initialValues: {
            login: '', password: '', matchPassword: '', username: '', gender: 'male'
        }, validationSchema: registerSchema, onSubmit: (values) => {
            // await new Promise(resolve => setTimeout(resolve, 2000))
            alert(JSON.stringify(values));
        }
    })
    return (<>
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
            {/*Login*/}
            <label htmlFor="login">Login</label>
            <input
                className={formik.errors.login && formik.touched.login ? 'input-error' : ''}
                autoFocus
                type="text"
                placeholder='login'
                id='login'
                name='login'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.login}
            />
            {formik.touched.login && formik.errors.login ? <p className='error'>{formik.errors.login}</p> : null}

            {/*Password*/}
            <label htmlFor="password">Password</label>
            <input
                className={formik.errors.password && formik.touched.password ? 'input-error' : ''}
                type="password"
                id='password'
                name='password'
                placeholder='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}/>
            {formik.touched.password && formik.errors.password ?
                <p className='error'>{formik.errors.password}</p> : null}
            {/*Confirm Password*/}
            <label htmlFor="matchPassword">Confirm Password</label>
            <input
                className={formik.errors.matchPassword && formik.touched.matchPassword ? 'input-error' : ''}
                type="password"
                id='matchPassword'
                name='matchPassword'
                placeholder='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.matchPassword}
            />
            {formik.touched.matchPassword && formik.errors.matchPassword ?
                <p className='error'>{formik.errors.matchPassword}</p> : null}
            <button type="submit">Register</button>
        </form>
        <div>
            <h3>Values</h3>
            <p>Login: {formik.values.login}</p>
            <p>password: {formik.values.password}</p>
            <p>matchPassword: {formik.values.matchPassword}</p>
        </div>

    </>);
}

export default Register;