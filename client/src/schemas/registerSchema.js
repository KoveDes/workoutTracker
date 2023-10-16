import * as Yup from "yup";

const registerSchemaAuth = Yup.object({
    login: Yup.string().trim()
        .required('Required')
        .min(4, `Login should contain at least 4 characters.`)
        .matches(/^(?![.\s])[^.]*$/, 'Login should not contain spaces or dots'),
    password: Yup.string()
        .required('Required')
        .min(4, 'Password should have at least 4 characters.')
        .test('no-space', 'Password should not contain spaces.', value => !value.includes(' ')),

    matchPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match.')
        .test('no-space', 'Password should not contain spaces', value => !value.includes(' ')),


});
const registerSchemaDetails = Yup.object({
    email: Yup.string().required('Required').email('Enter a proper email'),
    username: Yup.string().required("Required").min(4, 'Username should contain at least 4 characters'),
    gender: Yup.string().required().oneOf(['female', 'male']).required('Required'),
    age: Yup.number().required('Required').min(10).max(100).integer(),
    height: Yup.number().required('Required').min(65).max(272),
    weight: Yup.number().required('Required').min(30).max(442),


})
export default registerSchemaAuth
export {registerSchemaDetails}