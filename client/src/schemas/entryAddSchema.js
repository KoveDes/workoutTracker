import * as Yup from 'yup';

const weightSchema = Yup.object({
    "weight": Yup.number().required('Required').min(30).max(442),
})
const bodyParamSchema = Yup.object({
    "size": Yup.number().required('Required').min(1, 'Size must be positive').max(500, 'Maximum size is 500cm'),
})
export default weightSchema
export {bodyParamSchema}