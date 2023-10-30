import * as Yup from "yup";

export default Yup.object({
    bodyParameter: Yup.string().required('Required'),
    endValue: Yup.number().required('Required').min(1, 'Size must be positive').max(500, 'Maximum size is 500cm'),
})

