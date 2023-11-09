import {Form, Formik} from "formik";
import {Box, Typography, Grid} from "@mui/material";
import CustomInput from "../components/CustomInputs.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import weightGoalSchema from "../schemas/weightGoalSchema.js";
import useFetch from "../hooks/useFetch.js";

function WeightGoalForm({setError, setIsSubmitting, setChange, setSuccess,data}) {
    const axiosPrivate = useAxiosPrivate();
    const {response} = useFetch(({
        method: 'get',
        path: '/user/weight',
        deps: [],
    }))
    const currentWeight = response?.weight;


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
                if(values.endValue === currentWeight) {
                    throw Error('You cant set your current weight');
                }
                await axiosPrivate.post('/goal', {
                    category: values.endValue > currentWeight ? 'weightUp' : 'weightDown',
                    currentValue: Number(currentWeight),
                    endValue: values.endValue,

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
                endValue: data?.endValue || currentWeight,
            }}
            validationSchema={weightGoalSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='weightGoalForm'
                      style={{
                          maxWidth: 'inherit',
                          marginTop: '20px'
                      }}
                >
                    <Grid container spacing={2} direction='column'>
                        <Grid container justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='p'>Current weight</Typography>
                                <Typography variant='h6'>{currentWeight} kg</Typography>

                            </Box>
                            <Box>
                                <Typography variant='p'>{currentWeight === props.values.endValue ?
                                    'Lose / Put on' :currentWeight > props.values.endValue ? "Lose" : "Put on"  }</Typography>
                                <Typography variant='h6' textAlign='right'>
                                    {Math.abs(currentWeight - props.values.endValue)}
                                    kg</Typography>

                            </Box>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Box sx={{width:'25%'}}>
                                <CustomInput
                                    name='endValue'
                                    type='number'
                                    adornment='kg'
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default WeightGoalForm;