import * as Yup from "yup";

export default Yup.object({
    endValue: Yup.number().required('Required').min(30, 'Minimum weight is 30kg').max(442, 'Maximum weight is 442kg'),
})

