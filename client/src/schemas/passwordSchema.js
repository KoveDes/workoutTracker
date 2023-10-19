import * as Yup from 'yup';

export default Yup.object({
    password: Yup.string()
        .required('Required')
        .min(4, 'Password should have at least 4 characters.')
        .test('no-space', 'Password should not contain spaces.', value => !value.includes(' ')),

    matchPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match.')
        .test('no-space', 'Password should not contain spaces', value => !value.includes(' ')),

})