import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().required('Required').email('Enter a proper email'),
    username: Yup.string().required("Required").min(4, 'Username should contain at least 4 characters'),
    gender: Yup.string().required().oneOf(['female', 'male']).required('Required'),
    age: Yup.number().required('Required').min(10).max(100).integer(),
})