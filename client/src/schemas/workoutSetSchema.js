import * as Yup from 'yup';


export default Yup.object({
    sets: Yup.array().of(
        Yup.object().shape({
            load: Yup.number().required('Required').min(0.25, 'Minimum value is 0.25 kg'),
            reps: Yup.number().required('Required').min(1, 'Minimum value is 1'),
            rpe: Yup.number().required('Required').min(1, 'Minimum value is 1'),
            // sets: Yup.array().min(1, 'Add set').of(Yup.object().shape({
            //     showDuration: Yup.boolean(),
            //     reps: Yup.number().required('Required').min(1, 'Required'),
            //
            // }))

        })
    )
})