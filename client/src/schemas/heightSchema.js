import * as Yup from 'yup';

export default  Yup.object({
    height: Yup.number().required('Required').min(65).max(272),
})