import * as Yup from 'yup';


export default Yup.object({
    exercises: Yup.array().min(2, 'Select minimum 2 exercises')
})