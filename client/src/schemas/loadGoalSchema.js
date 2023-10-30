import * as Yup from "yup";

export default Yup.object({
    exercise: Yup.string().required('Required'),
    endValue: Yup.number().required('Required').min(1, 'Load (kg) must be positive'),
})

