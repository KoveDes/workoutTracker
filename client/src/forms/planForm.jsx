import React from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import workoutPlanSchema from "../schemas/workoutPlanSchema.js";
import CustomInput, {CustomCheckbox} from "../components/CustomInputs.jsx";

function PlanForm({setError, setIsSubmitting, setSuccess, setChange, data: workoutPlan}) {
    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        try {
            if (workoutPlan?.name) {
                await axiosPrivate.patch('/workoutPlan', {
                    name: values.name,
                    description: values.description,
                    main: values.main,
                    id: workoutPlan._id
                });
                message = 'Workout Plan updated';
            } else {
                await axiosPrivate.post('/workoutPlan', {
                    name: values.name,
                    description: values.description,
                    main: values.main,
                });
                message = 'New workout Plan created!';
            }
            setSuccess(true);
            setChange(v => !v);
            setSuccess(message);

        } catch (e) {
            setError(e?.response?.data?.message || e.message);
        } finally {
            setIsSubmitting(false);

        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                name: workoutPlan?.name || '',
                description: workoutPlan?.description || '',
                main: workoutPlan?.main || false,
            }}
            validationSchema={workoutPlanSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form id='planForm'>
                    <CustomInput
                        label='Name'
                        name='name'
                        placeholder='name'
                    />
                    <CustomInput
                        label='Description'
                        name='description'
                        placeholder='description...'
                    />
                    <CustomCheckbox
                        label='Main'
                        name='main'
                    />
                </Form>
            )}
        </Formik>
    )
}

export default PlanForm;