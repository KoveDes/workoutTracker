import * as Yup from 'yup';


export default Yup.object({
    exercises: Yup.array().of(
        Yup.object().shape({
            restTime: Yup.number().required('Required').min(15, 'Required'),
            sets: Yup.array().min(1,'Add set').of(Yup.object().shape({
                showDuration: Yup.boolean(),
                reps: Yup.number().required('Required').min(1, 'Required'),

            }))

        })
    )
})