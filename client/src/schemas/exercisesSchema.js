import * as Yup from 'yup';


export default Yup.object({
    exercises: Yup.array().min(1, 'Select minimum 1 exercise')
})