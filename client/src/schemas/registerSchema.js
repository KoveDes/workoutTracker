import * as Yup from "yup";

const registerSchema = Yup.object({
    login: Yup.string().trim()
        .required('Required')
        .min(4, `Login should be at least 4 characters.`)
        .matches(/^(?![.\s])[^.]*$/, 'Login should not contain spaces or dots'),
    password: Yup.string().trim()
        .required('Required')
        .min(4, 'Password should be at least 4 characters.'),
    matchPassword: Yup.string().trim()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match.')
});

export default registerSchema