import React, {useState} from 'react';
import {Form, Formik, useFormik} from "formik";
import * as Yup from 'yup';

import axios from '../api/axios'
import CustomInput, {PasswordInput} from "../components/CustomInputs.jsx";
import registerSchema from "../schemas/registerSchema.js";

const REGISTER_URL = '/register'

export function RegisterForm(props) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                    matchPassword: ''
                }}
                validationSchema={Yup.object({
                    login: Yup.string().trim()
                        .required('Required')
                        .min(4, `Login should have at least 4 characters.`)
                        .matches(/^(?![.\s])[^.]*$/, 'Login should not contain dots')
                        .test('no-space', 'Login should not contain dots or spaces', value => !value.includes(' '))
                    ,
                    password: Yup.string().trim()
                        .required('Required')
                        .min(4, 'Password should have at least 4 characters.')
                        .matches(/^(?![.\s])[^.]*$/, 'Login should not contain dots or spaces')
                        .test('no-space', 'Login should not contain dots or spaces', value => !value.includes(' ')),

                    matchPassword: Yup.string().trim()
                        .required('Required')
                        .oneOf([Yup.ref('password')], 'Passwords must match.')
                })}
                onSubmit={async (values, actions) => {
                    // setTimeout(() => {
                    //     actions.setSubmitting(false);
                    //     // actions.resetForm();
                    //     setSuccess(true);
                    // }, 2000);
                    setError('');
                    const {login, password} = values;
                    try {
                        const response = await axios.post(
                            'http://localhost:3500/register',
                            JSON.stringify({login, password}),
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                withCredentials: true,
                            }
                        );
                        setSuccess(response.message);
                        actions.resetForm();
                    } catch ({response}) {
                        // console.log(response.status);
                        setError(response.status === 409 ? response.data.message : "Error!")
                    }

                }}
            >
                {(props) => (
                    <Form>
                        <CustomInput
                            type='text'
                            label='Login'
                            name='login'
                            id='login'
                            placeholder='login'
                            // autoFocus


                        />
                        <PasswordInput
                            label='Password'
                            name='password'
                            id='password'
                            placeholder='password'/>
                        <PasswordInput
                            id='matchPassword'
                            label='Confirm password'
                            name='matchPassword'
                            placeholder='password'/>
                        <button
                            disabled={props.isSubmitting}
                            type="submit">{props.isSubmitting ? "Creating an account..." : 'Register'}</button>
                        {props.status}
                    </Form>
                )}

            </Formik>
            {error ?
                <h1>{error}</h1>
                : null}
            {success ? (<section>
                <h1>{success}</h1>
                <div>{JSON.stringify(props.values)}</div>
            </section>) : null}
        </>)
}

function Register(props) {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            matchPassword: ''
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