import React, {useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import CustomInput, {CustomCheckbox, PasswordInput} from "../components/CustomInputs.jsx";
import loginSchema from "../schemas/loginSchema.js";


function LoginForm(props) {
    //auth
    const {setAuth, persist, setPersist} = useAuth();


    //navigate to site where user wanted to go
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values, actions) => {
        setError(null);
        const {login, password, persist: formPersist} = values;
        try {
            const response = await axios.post(
                '/auth/login',
                JSON.stringify({login, password}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({user: login, accessToken});
            setPersist(formPersist);
            setSuccess('Logged in!');
            localStorage.setItem('persist', formPersist)
            //display congrats message first
            navigate(from, {replace: true});
        } catch ({response}) {
            if ([400, 401].includes(response.request.status)) {
                setError(response.data.message)
            } else {
                setError('Invalid server response')
            }
        }
    }

    return (
        <>
            {success ? (<section>
                <h1>{success}</h1>
                <p>Persist: {persist.toString()}</p>
            </section>) : (
                <div>
                    <h1>Login</h1>
                    <Formik
                        initialValues={{
                            login: '',
                            password: '',
                            persist: false,

                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}>
                        {(props) => (
                            <Form style={{display: success ? 'none' : 'block'}}>
                                <CustomInput
                                    type='text'
                                    label='login'
                                    name='login'
                                    id='login'
                                    placeholder='login'
                                    // autoFocus
                                />
                                <PasswordInput
                                    label='Password'
                                    name='password'
                                    id='password'
                                    placeholder='password'
                                />
                                <button type='submit' disabled={props.isSubmitting}>
                                    {props.isSubmitting ? "Logging in..." : 'Login'}
                                </button>
                                <CustomCheckbox
                                    label='Trust this device (24 hours)'
                                    name='persist'
                                    id='persist'
                                />
                            </Form>
                        )}
                    </Formik>
                    {error ?
                        <h1 style={{color: 'red'}}>{error}</h1>
                        : null}
                </div>

            )}
        </>
    )
}

export default LoginForm;