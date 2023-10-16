import React, {useState} from 'react';
import {Form, Formik, useFormik} from "formik";
import CustomInput, {CustomRadio, PasswordInput} from "../components/CustomInputs.jsx";
import {default as registerSchemaAuth, registerSchemaDetails} from "../schemas/registerSchema.js";
import {Button} from "@mui/material";

const REGISTER_URL = '/register'

export function Register(props) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <h1>Register</h1>
            <FormikStepper
                initialValues={{
                    login: '',
                    password: '',
                    matchPassword: '',
                    email: '',
                    username: '',
                    gender: 'male',
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
                {/*{(props) => (*/}
                {/*    <>*/}
                {/*// <Form>*/}
                <FormikStep
                    validationSchema={registerSchemaAuth}
                >
                    <CustomInput
                        type='text'
                        label='Login'
                        name='login'
                        placeholder='login'
                        // autoFocus
                    />
                    <PasswordInput
                        label='Password'
                        name='password'
                        placeholder='password'/>
                    <PasswordInput
                        label='Confirm password'
                        name='matchPassword'
                        placeholder='password'/>
                </FormikStep>
                <FormikStep
                    validationSchema={registerSchemaDetails}
                >
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

                    <div>
                        <h3>Gender</h3>
                        <CustomRadio
                            label='Female'
                            name='gender'
                            value='female'
                        />
                        <CustomRadio
                            label='Male'
                            name='gender'
                            value='male'
                        />
                    </div>
                    {/*Gender checkbox    */}
                    <CustomInput
                        name='age'
                        label="Age"
                        type='number'

                    />
                    <CustomInput
                        name='height'
                        label="Height (cm)"
                        type='number'
                    />
                    <CustomInput
                        name='weight'
                        label="Weight (kg)"
                        type='number'
                    />

                </FormikStep>

                {/*    </>*/}
                {/*)}*/}

            </FormikStepper>
            {error ?
                <h1>{error}</h1>
                : null}
            {success ? (<section>
                <h1>{success}</h1>
                <div>{JSON.stringify(props.values)}</div>
            </section>) : null}
        </>)
}

export function FormikStep({children, ...props}) {
    return <>{children}</>
}


export function FormikStepper({children, ...props}) {
    const childrenArr = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArr[step];
    const isLastStep = step === childrenArr.length - 1;

    return (
        <Formik {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={async (values, actions) => {
                    if (isLastStep) {
                        await props.onSubmit(values, actions);
                    } else {
                        setStep(s => s + 1);
                    }
                }}
        >
            {(props) => (
                <Form>
                    <h1>Step: {step}</h1>
                    {currentChild}
                    {step > 0 ? <Button onClick={() => setStep(s => s - 1)}>Back</Button> : null}
                    <Button type='submit'>Next</Button>
                    {/*<button*/}
                    {/*    disabled={props.isSubmitting}*/}
                    {/*    type="submit">{props.isSubmitting ? "Creating an account..." : 'Register'}</button>*/}
                </Form>
            )}
        </Formik>
    )
}


export function RegisterForm(props) {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            matchPassword: '',
            username: '',
            gender: 'male'
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            // await new Promise(resolve => setTimeout(resolve, 2000))
            alert(JSON.stringify(values));
        }
    })
    return (
        <>
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

        </>
    );
}

export default Register;