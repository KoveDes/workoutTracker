import * as Yup from "yup";

export default Yup.object({
    endValue: Yup.number().required('Required').min(1, 'Set minimum 1 workout to perform'),
})

