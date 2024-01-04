import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import {Box, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput from "../components/CustomInputs.jsx";
import countGoalSchema from "../schemas/countGoalSchema.js";

function CountGoalForm({setError, setIsSubmitting, setChange, setSuccess, data}) {
    const axiosPrivate = useAxiosPrivate();
    console.log()
    const handleSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        try {
            if (data) {
                await axiosPrivate.patch('/goal', {
                    endValue: values.endValue,
                    id: data._id,
                })
                message = 'Goal updated';
            } else {
                await axiosPrivate.post('/goal', {
                    category: 'workoutCount',
                    endValue: values.endValue,
                    currentValue: 0,

                })
                message = 'New goal created!';
            }
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
                endValue: data?.endValue || 1,
            }}
            validationSchema={countGoalSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form id='countGoalForm'
                      style={{
                          maxWidth: 'inherit',
                      }}
                >

                    <Grid container spacing={0} direction='column'>
                        <Grid container justifyContent={'center'}>
                            <Box sx={{width: '50%'}}>
                                <CustomInput
                                    name='endValue'
                                    type='number'
                                    label='Workouts'
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CountGoalForm;