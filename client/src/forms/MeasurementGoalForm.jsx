import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import {Box, Divider, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import CustomInput, {CustomRadioList} from "../components/CustomInputs.jsx";
import measurementGoalSchema from "../schemas/measurementGoalSchema.js";
import useAuth from "../hooks/useAuth.js";

const bodyParamsList = ['leftCalf', 'rightCalf', 'leftThigh', 'rightThigh', 'hips', 'waist', 'chest', 'neck', 'shoulders', 'leftForearm', 'rightForearm', 'leftArm', 'rightArm'];

function MeasurementGoalForm({setError, setIsSubmitting, success, setSuccess, data, setChange}) {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();


    const handleSubmit = async (values) => {
        console.log('elo')
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
                const {data} = await axiosPrivate.get(`body/${values.bodyParameter}?user=${auth.user}`)
                const currentSize = data?.data.reverse()[data?.data.length - 1]?.size || 0;
                console.log(data)
                console.log(currentSize)
                if (values.endValue <= currentSize) {
                    throw Error(`Goal size should be higher than current one: ${currentSize} cm`);
                }
                await axiosPrivate.post('/goal', {
                    category: 'measurement',
                    bodyParameter: values.bodyParameter,
                    currentValue: Number(currentSize),
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
                bodyParameter: data?.bodyParameter || '',
                endValue: data?.endValue || 0,
            }}
            validationSchema={measurementGoalSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='measurementGoalForm'
                      style={{
                          maxWidth: 'inherit',
                          marginTop: '20px'
                      }}
                >
                    {data ? null : (<>
                            <Grid mb='30px'>
                                <CustomRadioList
                                    label='Body Part'
                                    name='bodyParameter'
                                    color={success ? 'success' : null}
                                    itemArray={bodyParamsList}
                                />
                            </Grid>
                            <Divider/>
                        </>
                    )}

                    <Grid container gap={2} direction='column'>
                        <Typography variant='h5' textAlign='center' m='15px 0 0 0'>{props.values.bodyParameter}</Typography>
                        <Grid container justifyContent={'center'}>
                            <Box sx={{width: '35%'}}>
                                <CustomInput
                                    name='endValue'
                                    type='number'
                                    adornment='cm'
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default MeasurementGoalForm;