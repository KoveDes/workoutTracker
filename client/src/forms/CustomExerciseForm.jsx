import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Form, Formik} from "formik";
import customExerciseSchema from "../schemas/customExerciseSchema.js";
import {Box, Grid} from "@mui/material";
import CustomInput, {CustomCheckboxList, CustomRadioList} from "../components/CustomInputs.jsx";
import {EQUIPMENT_OPTIONS, TARGET_MUSCLES} from "../components/exercises/ExercisesFilters.jsx";

export default function CustomExerciseForm({setError, setIsSubmitting, success, setSuccess, setChange, customExercise}) {
    const axiosPrivate = useAxiosPrivate();
    const handleSubmit = async (values) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);
        let message = '';
        try {
            if (customExercise?.name) {
                await axiosPrivate.patch('/customExercise', {
                    name: values.name,
                    url: values.url,
                    active: values.activeMuscles,
                    equipment: values.equipment,
                    primary: values.primaryMuscle,
                    id: customExercise._id,
                })
                message = 'Custom exercise updated';
            } else {
                await axiosPrivate.post('/customExercise', {
                    name: values.name,
                    url: values.url,
                    active: values.activeMuscles,
                    equipment: values.equipment,
                    primary: values.primaryMuscle,
                })
                message = 'New custom exercise created!';
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
                name: customExercise?.name || '',
                url: customExercise?.gifUrl || '',
                activeMuscles: customExercise?.secondaryMuscles || [],
                equipment: customExercise?.equipment || '',
                primaryMuscle: customExercise?.target || '',
            }}
            validationSchema={customExerciseSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form id='customExerciseForm'
                      style={{
                          maxWidth: 'inherit'
                      }}
                >
                    <Grid container spacing={5}>
                        <Grid md={3}>
                            <Box>
                                <CustomInput
                                    label='Name'
                                    name='name'
                                    placeholder='name'
                                    color={success ? 'success' : null}
                                />
                            </Box>
                            <Box>
                                <CustomInput
                                    label='Image URL'
                                    name='url'
                                    placeholder='https://....'
                                    color={success ? 'success' : null}
                                />
                            </Box>
                        </Grid>
                        <Grid md={3}>
                            <Box>
                                <CustomRadioList
                                    label='Equipment'
                                    name='equipment'
                                    color={success ? 'success' : null}
                                    itemArray={EQUIPMENT_OPTIONS}
                                    exerciseValue={customExercise?.equipment}
                                    param
                                />
                            </Box>
                        </Grid>
                        <Grid md={3}>
                            <Box>
                                <CustomCheckboxList
                                    label='Active Muscles'
                                    name='activeMuscles'
                                    color={success ? 'success' : null}
                                    itemArray={TARGET_MUSCLES}
                                    exerciseValue={customExercise?.secondaryMuscles}
                                    param
                                />
                            </Box>
                        </Grid>
                        <Grid md={3}>
                            <Box>
                                <CustomRadioList
                                    label='Primary Muscles'
                                    name='primaryMuscle'
                                    exerciseValue={customExercise?.target}
                                    color={success ? 'success' : null}
                                    itemArray={props.values.activeMuscles}
                                    param
                                />
                            </Box> </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}